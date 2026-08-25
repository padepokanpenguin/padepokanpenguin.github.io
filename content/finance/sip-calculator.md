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
                <input type="text" id="monthlyInvestment" placeholder="cth: 1.000.000" oninput="sipFmt(this); calculateSIP()">
            </div>

            <div class="input-group">
                <label>Jangka Waktu (Tahun)</label>
                <select id="tenorYears" onchange="calculateSIP()">
                    <option value="1">1 Tahun</option>
                    <option value="3">3 Tahun</option>
                    <option value="5" selected>5 Tahun</option>
                    <option value="7">7 Tahun</option>
                    <option value="10">10 Tahun</option>
                    <option value="15">15 Tahun</option>
                    <option value="20">20 Tahun</option>
                    <option value="25">25 Tahun</option>
                    <option value="30">30 Tahun</option>
                </select>
            </div>

            <div class="input-group">
                <label>Expected Annual Return (%)</label>
                <input type="number" id="annualReturn" value="12" min="1" max="30" step="0.5" oninput="calculateSIP()">
            </div>

            <div class="input-group">
                <label>Jenis Return</label>
                <select id="returnType" onchange="calculateSIP()">
                    <option value="compound">Compound (bunga berbunga)</option>
                    <option value="simple">Simple (bunga tetap)</option>
                </select>
            </div>

            <div class="info-box">
                <strong>📐 Rumus Compound SIP</strong><br>
                FV = P × ((1+r)ⁿ − 1) / r<br>
                r = monthly rate &nbsp;|&nbsp; n = total months<br>
                Makin lama, efek compound makin besar.
            </div>
        </div>

        <div class="calculator-results">
            <h3>Hasil</h3>

            <div id="sipPlaceholder" class="calc-placeholder">
                <span class="ph-icon">📈</span>
                Isi investasi bulanan untuk melihat proyeksi
            </div>

            <div id="sipResultSection" style="display:none;">
                <div class="sip-summary-card">
                    <div class="sip-summary-label">💰 Total Nilai Investasi</div>
                    <div class="sip-summary-value" id="totalValue">—</div>
                    <div class="sip-summary-sub" id="multiplierBadge">—</div>
                </div>

                <div class="sip-breakdown">
                    <div class="sip-breakdown-item sip-principal">
                        <span class="sip-bd-dot"></span>
                        <div>
                            <div class="sip-bd-label">Total Investasi</div>
                            <div class="sip-bd-value" id="sumInvested">—</div>
                        </div>
                    </div>
                    <div class="sip-breakdown-item sip-returns">
                        <span class="sip-bd-dot"></span>
                        <div>
                            <div class="sip-bd-label">Total Returns</div>
                            <div class="sip-bd-value" id="sumInterest">—</div>
                        </div>
                    </div>
                </div>

                <div class="sip-stacked-bar">
                    <div class="sip-bar-principal" id="sipBarPrincipal" style="width:50%;"></div>
                    <div class="sip-bar-returns" id="sipBarReturns" style="width:50%;"></div>
                </div>

                <div class="result-row"><span>Rata-rata Return/Bulan</span><span id="avgMonthly">—</span></div>
                <div class="result-row highlight"><span>Multiplier</span><span id="multiplier">—</span></div>

                <div class="sip-chart-wrap">
                    <div class="sip-chart-title">Pertumbuhan Portfolio</div>
                    <div class="sip-chart" id="sipChart"></div>
                    <div class="sip-legend">
                        <span><i class="sip-dot sip-dot-p"></i>Principal</span>
                        <span><i class="sip-dot sip-dot-r"></i>Returns</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
.sip-summary-card { background: linear-gradient(135deg, #ff9800, #e65100); color: #fff; border-radius: 12px; padding: 1.25rem 1rem; text-align: center; margin-bottom: 1rem; }
.sip-summary-label { font-size: 0.75rem; font-weight: 600; opacity: 0.85; text-transform: uppercase; letter-spacing: 0.6px; }
.sip-summary-value { font-size: 1.7rem; font-weight: 800; margin-top: 0.2rem; letter-spacing: -0.5px; }
.sip-summary-sub { font-size: 0.8rem; opacity: 0.85; margin-top: 0.2rem; }
.sip-breakdown { display: flex; gap: 8px; margin-bottom: 0.75rem; }
.sip-breakdown-item { flex: 1; display: flex; align-items: center; gap: 8px; background: var(--theme); border: 1px solid var(--border); border-radius: 10px; padding: 10px 12px; }
.sip-bd-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.sip-principal .sip-bd-dot { background: #4caf50; }
.sip-returns .sip-bd-dot { background: #ff9800; }
.sip-bd-label { font-size: 0.7rem; color: var(--secondary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.3px; }
.sip-bd-value { font-size: 0.88rem; font-weight: 700; color: var(--primary); margin-top: 2px; }
.sip-stacked-bar { display: flex; height: 8px; border-radius: 8px; overflow: hidden; margin-bottom: 1rem; }
.sip-bar-principal { background: #4caf50; transition: width 0.6s ease; }
.sip-bar-returns { background: #ff9800; flex: 1; }
.sip-chart-wrap { margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border); }
.sip-chart-title { font-size: 0.75rem; font-weight: 600; color: var(--secondary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
.sip-chart { display: flex; align-items: flex-end; gap: 6px; height: 120px; }
.sip-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; height: 100%; justify-content: flex-end; }
.sip-bar-wrap { width: 100%; display: flex; flex-direction: column; justify-content: flex-end; overflow: hidden; border-radius: 5px 5px 0 0; }
.sip-bar-seg-r { background: #ff9800; }
.sip-bar-seg-p { background: #4caf50; }
.sip-col-label { font-size: 0.62rem; color: var(--secondary); white-space: nowrap; }
.sip-legend { display: flex; gap: 16px; margin-top: 8px; font-size: 0.75rem; color: var(--secondary); }
.sip-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 4px; vertical-align: middle; }
.sip-dot-p { background: #4caf50; }
.sip-dot-r { background: #ff9800; }
</style>

<script>
function sipFmt(el) {
    const raw = el.value.replace(/[^0-9]/g, '');
    el.value = raw ? parseInt(raw).toLocaleString('id-ID') : '';
}
function sipParse(str) {
    return parseInt((str || '0').replace(/[^0-9]/g, '')) || 0;
}
function sipFmtShort(n) {
    if (n >= 1e12) return 'Rp\u00a0' + (n / 1e12).toFixed(2) + '\u00a0T';
    if (n >= 1e9)  return 'Rp\u00a0' + (n / 1e9).toFixed(2) + '\u00a0M';
    if (n >= 1e6)  return 'Rp\u00a0' + (n / 1e6).toFixed(1) + '\u00a0Jt';
    return 'Rp\u00a0' + Math.round(n).toLocaleString('id-ID');
}
function sipCalcFV(monthly, rate, months, type) {
    if (type === 'compound') {
        return monthly * ((Math.pow(1 + rate, months) - 1) / rate);
    }
    let acc = 0;
    for (let i = 0; i < months; i++) acc += monthly + monthly * rate;
    return acc;
}
function calculateSIP() {
    const monthly = sipParse(document.getElementById('monthlyInvestment').value);
    const years = parseInt(document.getElementById('tenorYears').value) || 5;
    const annualReturn = (parseFloat(document.getElementById('annualReturn').value) || 12) / 100;
    const returnType = document.getElementById('returnType').value;
    const placeholder = document.getElementById('sipPlaceholder');
    const resultSection = document.getElementById('sipResultSection');
    if (monthly <= 0) { placeholder.style.display = ''; resultSection.style.display = 'none'; return; }

    const monthlyRate = annualReturn / 12;
    const totalMonths = years * 12;
    const totalInvested = monthly * totalMonths;
    const futureValue = sipCalcFV(monthly, monthlyRate, totalMonths, returnType);
    const totalReturns = futureValue - totalInvested;
    const multiplier = futureValue / totalInvested;

    const pPct = (totalInvested / futureValue * 100).toFixed(1);

    document.getElementById('totalValue').textContent = sipFmtShort(futureValue);
    document.getElementById('multiplierBadge').textContent = multiplier.toFixed(2) + 'x dari modal awal';
    document.getElementById('sumInvested').textContent = sipFmtShort(totalInvested);
    document.getElementById('sumInterest').textContent = sipFmtShort(totalReturns);
    document.getElementById('avgMonthly').textContent = sipFmtShort(totalReturns / totalMonths);
    document.getElementById('multiplier').textContent = multiplier.toFixed(2) + 'x';
    document.getElementById('sipBarPrincipal').style.width = pPct + '%';

    const chart = document.getElementById('sipChart');
    chart.innerHTML = '';
    const maxCols = Math.min(years, 10);
    const step = Math.max(1, Math.ceil(years / maxCols));
    for (let y = step; y <= years; y += step) {
        const m = y * 12;
        const fv = sipCalcFV(monthly, monthlyRate, m, returnType);
        const principal = monthly * m;
        const hPct = (fv / futureValue * 100).toFixed(1);
        const pH = (principal / fv * 100).toFixed(1);
        const rH = (100 - parseFloat(pH)).toFixed(1);
        const col = document.createElement('div');
        col.className = 'sip-col';
        col.innerHTML = `<div class="sip-bar-wrap" style="height:${hPct}%;"><div class="sip-bar-seg-r" style="height:${rH}%;"></div><div class="sip-bar-seg-p" style="height:${pH}%;"></div></div><span class="sip-col-label">Th${y}</span>`;
        chart.appendChild(col);
    }
    placeholder.style.display = 'none';
    resultSection.style.display = '';
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('monthlyInvestment').value = '1.000.000';
    calculateSIP();
});
</script>
