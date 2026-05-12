---
title: "SIP Calculator"
date: 2025-10-12T10:00:00+07:00
draft: false
description: "Systematic Investment Plan calculator. Simulasikan pertumbuhan investasi rutin bulanan dan compound returns."
markup: html
---

<div class="calculator-page">
    <header class="calculator-header">
        <h1>📈 SIP Calculator</h1>
        <p>Systematic Investment Plan — simulasi investasi rutin bulanan dengan compound returns</p>
    </header>

    <div class="calculator-container">
        <div class="calculator-inputs">
            <h3>Input</h3>

            <div class="input-group">
                <label>Monthly Investment (Rp)</label>
                <input type="text" id="monthlyInvestment" placeholder="cth: 1.000.000" oninput="formatNum(this)">
            </div>

            <div class="input-group">
                <label>Jangka Waktu (Tahun)</label>
                <select id="tenorYears">
                    <option value="1">1 Tahun</option>
                    <option value="3">3 Tahun</option>
                    <option value="5" selected>5 Tahun</option>
                    <option value="7">7 Tahun</option>
                    <option value="10">10 Tahun</option>
                    <option value="15">15 Tahun</option>
                    <option value="20">20 Tahun</option>
                    <option value="25">25 Tahun</option>
                </select>
            </div>

            <div class="input-group">
                <label>Expected Annual Return (%)</label>
                <input type="number" id="annualReturn" value="12" min="1" max="30" step="0.5">
            </div>

            <div class="input-group">
                <label>Jenis Return</label>
                <select id="returnType">
                    <option value="compound">Compound (bunga berbunga)</option>
                    <option value="simple">Simple (bunga tetap)</option>
                </select>
            </div>

            <button class="calc-btn" onclick="calculateSIP()">Hitung Returns</button>
        </div>

        <div class="calculator-results">
            <h3>Hasil</h3>

            <div id="resultSection" style="display:none;">
                <div class="result-highlight">
                    <div class="label">💰 Total Nilai Investasi</div>
                    <div class="value" id="totalValue">-</div>
                </div>

                <div class="result-row"><span>Total Investasi</span><span id="sumInvested">-</span></div>
                <div class="result-row"><span>Total Returns</span><span id="sumInterest">-</span></div>
                <div class="result-row"><span>Rata-rata Return/Bulan</span><span id="avgMonthly">-</span></div>
                <div class="result-row highlight"><span>Multiplier</span><span id="multiplier">-</span></div>

                <div class="bar-chart" id="chartSection" style="margin-top:16px;"></div>

                <div class="legend" style="display:flex;gap:16px;margin-top:8px;font-size:0.75rem;">
                    <span><span style="display:inline-block;width:10px;height:10px;background:#4caf50;border-radius:50%;margin-right:4px;"></span>Principal</span>
                    <span><span style="display:inline-block;width:10px;height:10px;background:#ff9800;border-radius:50%;margin-right:4px;"></span>Returns</span>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
.result-highlight { background: linear-gradient(135deg, #ff9800, #e65100); color: white; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 16px; }
.result-highlight .value { font-size: 1.8rem; font-weight: 700; }
.result-highlight .label { font-size: 0.85rem; opacity: 0.9; }
.result-section .result-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--border); font-size: 0.9rem; }
.result-section .result-row span:first-child { color: var(--secondary); }
.result-section .result-row.highlight span { font-weight: 700; color: var(--accent); }
.bar-chart { display: flex; align-items: flex-end; gap: 4px; height: 100px; }
.bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
.bar { width: 100%; border-radius: 4px 4px 0 0; min-height: 4px; transition: height 0.5s ease; }
.bar-col span { font-size: 0.65rem; color: var(--secondary); }
</style>

<script>
function formatNum(el) {
    let val = el.value.replace(/[^0-9]/g, '');
    if (val) el.value = parseInt(val).toLocaleString('id-ID');
}

function parseNum(str) {
    return parseInt((str || '0').toString().replace(/[^0-9]/g, '')) || 0;
}

function formatRupiah(num) {
    return 'Rp ' + Math.round(num).toLocaleString('id-ID');
}

function formatShort(num) {
    if (num >= 1e12) return 'Rp ' + (num / 1e12).toFixed(1) + 'T';
    if (num >= 1e9) return 'Rp ' + (num / 1e9).toFixed(1) + 'M';
    if (num >= 1e6) return 'Rp ' + (num / 1e6).toFixed(1) + 'Jt';
    return formatRupiah(num);
}

function calculateSIP() {
    const monthly = parseNum(document.getElementById('monthlyInvestment').value);
    const years = parseInt(document.getElementById('tenorYears').value) || 5;
    const annualReturn = (parseFloat(document.getElementById('annualReturn').value) || 12) / 100;
    const returnType = document.getElementById('returnType').value;

    if (monthly <= 0) { alert('Masukkan investasi bulanan yang valid.'); return; }

    const monthlyRate = annualReturn / 12;
    const totalMonths = years * 12;
    const totalInvested = monthly * totalMonths;

    let futureValue;
    if (returnType === 'compound') {
        futureValue = monthly * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    } else {
        let accumulated = 0;
        for (let i = 0; i < totalMonths; i++) {
            accumulated += monthly;
            accumulated += monthly * monthlyRate;
        }
        futureValue = accumulated;
    }

    const totalReturns = futureValue - totalInvested;
    const multiplier = futureValue / totalInvested;
    const avgMonthlyReturn = totalReturns / totalMonths;

    // Build chart
    const chartSection = document.getElementById('chartSection');
    chartSection.innerHTML = '';
    const steps = Math.min(years, 8);
    const stepSize = Math.max(1, Math.floor(years / steps));

    for (let y = stepSize; y <= years; y += stepSize) {
        const m = y * 12;
        let fv;
        if (returnType === 'compound') {
            fv = monthly * ((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate);
        } else {
            let acc = 0;
            for (let i = 0; i < m; i++) { acc += monthly; acc += monthly * monthlyRate; }
            fv = acc;
        }
        const principal = monthly * m;
        const pctPrincipal = (principal / fv) * 100;
        const barHeight = (fv / futureValue) * 100;

        const col = document.createElement('div');
        col.className = 'bar-col';
        col.innerHTML = `
            <div class="bar" style="height:${barHeight}%; background: linear-gradient(180deg, #ff9800 ${pctPrincipal}%, #4caf50 ${pctPrincipal}%);"></div>
            <span>Th${y}</span>
        `;
        chartSection.appendChild(col);
    }

    document.getElementById('totalValue').textContent = formatShort(futureValue);
    document.getElementById('sumInvested').textContent = formatShort(totalInvested);
    document.getElementById('sumInterest').textContent = formatShort(totalReturns);
    document.getElementById('avgMonthly').textContent = formatShort(avgMonthlyReturn);
    document.getElementById('multiplier').textContent = multiplier.toFixed(2) + 'x';
    document.getElementById('resultSection').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('monthlyInvestment').value = '1.000.000';
    calculateSIP();
});
</script>
