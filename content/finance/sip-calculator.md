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
                <label for="monthlyInvestment">Monthly Investment (Rp)</label>
                <input type="number" id="monthlyInvestment" placeholder="1000000" min="0" step="100000">
                <span class="hint">Jumlah investasi yang kamu alokasikan setiap bulan</span>
            </div>

            <div class="input-group">
                <label for="tenorYears">Jangka Waktu (Tahun)</label>
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
                <label for="annualReturn">Expected Annual Return (%)</label>
                <input type="number" id="annualReturn" value="12" min="1" max="30" step="0.5">
                <span class="hint">Rata-rata return tahunan (cth: 12% saham, 8% reksa dana campuran)</span>
            </div>

            <div class="input-group">
                <label for="returnType">Jenis Return</label>
                <select id="returnType">
                    <option value="compound">Compound (bunga berbunga)</option>
                    <option value="simple">Simple (bunga tetap)</option>
                </select>
            </div>

            <button id="calculate-sip" class="calc-button">Hitung Returns</button>
        </div>

        <div class="calculator-results">
            <h3>Results</h3>

            <div class="result-item highlight">
                <span class="result-label">💰 Total Nilai Investasi</span>
                <span class="result-value" id="totalValue">-</span>
            </div>
            <div class="result-item">
                <span class="result-label">Total Investasi</span>
                <span class="result-value" id="sumInvested">-</span>
            </div>
            <div class="result-item">
                <span class="result-label">Total Returns</span>
                <span class="result-value" id="sumInterest">-</span>
            </div>
            <div class="result-item">
                <span class="result-label">Avg Return / Bulan</span>
                <span class="result-value" id="avgMonthly">-</span>
            </div>
            <div class="result-item">
                <span class="result-label">Multiplier</span>
                <span class="result-value" id="multiplier">-</span>
            </div>

            <div class="bar-chart" id="chartSection" style="margin-top:20px;"></div>

            <div class="legend" style="display:flex;gap:16px;margin-top:8px;font-size:0.8rem;">
                <span><span style="display:inline-block;width:10px;height:10px;background:#4caf50;border-radius:50%;margin-right:4px;vertical-align:middle;"></span>Principal</span>
                <span><span style="display:inline-block;width:10px;height:10px;background:#ff9800;border-radius:50%;margin-right:4px;vertical-align:middle;"></span>Returns</span>
            </div>
        </div>
    </div>
</div>

<style>
.calculator-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
}

.calculator-header {
    text-align: center;
    margin-bottom: 30px;
}

.calculator-header h1 {
    font-size: 2rem;
    margin-bottom: 10px;
}

.calculator-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
}

@media (max-width: 768px) {
    .calculator-container {
        grid-template-columns: 1fr;
    }
    .calculator-header h1 {
        font-size: 1.5rem;
    }
    .calculator-header p {
        font-size: 0.9rem;
    }
    .calculator-inputs,
    .calculator-results {
        padding: 20px;
    }
}

@media (max-width: 480px) {
    .calculator-page {
        padding: 15px;
    }
    .calculator-header h1 {
        font-size: 1.3rem;
    }
    .input-group {
        margin-bottom: 15px;
    }
    .input-group label {
        font-size: 0.9rem;
    }
    .input-group input,
    .input-group select {
        padding: 10px 12px;
        font-size: 0.95rem;
    }
    .input-group .hint {
        font-size: 0.75rem;
    }
    .calc-button {
        padding: 12px;
        font-size: 0.95rem;
    }
    .result-item {
        flex-direction: column;
        gap: 5px;
    }
    .result-label {
        font-size: 0.85rem;
    }
    .result-value {
        font-size: 1.1rem;
    }
    .result-item.highlight .result-value {
        font-size: 1.2rem;
    }
}

.calculator-inputs {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 12px;
}

.calculator-inputs h3 {
    margin-bottom: 20px;
    color: #333;
}

.input-group {
    margin-bottom: 20px;
}

.input-group label {
    display: block;
    font-weight: 600;
    margin-bottom: 8px;
    color: #333;
}

.input-group input,
.input-group select {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s;
    background: #fff;
}

.input-group input:focus,
.input-group select:focus {
    outline: none;
    border-color: #4a90e2;
}

.input-group .hint {
    display: block;
    font-size: 0.85rem;
    color: #666;
    margin-top: 5px;
}

.calc-button {
    width: 100%;
    padding: 14px;
    background: #4a90e2;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;
}

.calc-button:hover {
    background: #357abd;
}

.calculator-results {
    background: #fff;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.calculator-results h3 {
    margin-bottom: 20px;
    color: #333;
}

.result-item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #eee;
}

.result-item:last-child {
    border-bottom: none;
}

.result-item.highlight {
    background: #e8f4fd;
    margin: 15px -15px -15px;
    padding: 15px;
    border-radius: 0 0 12px 12px;
    border-bottom: none;
}

.result-item.highlight .result-value {
    color: #4a90e2;
    font-size: 1.3rem;
}

.result-label {
    color: #666;
}

.result-value {
    font-weight: 700;
    color: #333;
}

.bar-chart {
    display: flex;
    align-items: flex-end;
    gap: 4px;
    height: 100px;
}

.bar-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

.bar {
    width: 100%;
    border-radius: 4px 4px 0 0;
    min-height: 4px;
    transition: height 0.5s ease;
}

.bar-col span {
    font-size: 0.65rem;
    color: #666;
}
</style>

<script>
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

    if (monthly <= 0) {
        alert('Masukkan investasi bulanan yang valid.');
        return;
    }

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
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('monthlyInvestment').value = '1000000';
    document.getElementById('calculate-sip').addEventListener('click', calculateSIP);
    calculateSIP();
});
</script>
