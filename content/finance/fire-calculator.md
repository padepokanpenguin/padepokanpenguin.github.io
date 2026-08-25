---
title: "FIRE Calculator"
date: 2025-10-12T10:00:00+07:00
draft: false
description: "Financial Independence Retire Early calculator. Simulasikan kapan kamu bisa bebas finansial dan pensiun dini."
markup: html
---

<div class="calculator-page">
    <header class="calculator-header">
        <h1>🔥 FIRE Calculator</h1>
        <p>Financial Independence, Retire Early — simulasi kapan kamu bisa bebas finansial</p>
    </header>

    <div class="calculator-container">
        <div class="calculator-inputs">
            <h3>Input</h3>

            <div class="input-group">
                <label>Umur Sekarang</label>
                <input type="number" id="currentAge" value="25" min="18" max="70" oninput="calculateFIRE()">
            </div>

            <div class="input-group">
                <label>Portfolio / Tabungan Saat Ini (Rp)</label>
                <input type="text" id="currentSavings" placeholder="cth: 50.000.000" oninput="fireFmt(this); calculateFIRE()">
            </div>

            <div class="input-group">
                <label>Monthly Investment (Rp)</label>
                <input type="text" id="monthlySavings" placeholder="cth: 3.000.000" oninput="fireFmt(this); calculateFIRE()">
            </div>

            <div class="input-group">
                <label>Expected Annual Return (%)</label>
                <input type="number" id="annualReturn" value="12" min="1" max="30" step="0.5" oninput="calculateFIRE()">
            </div>

            <div class="input-group">
                <label>Inflation Rate (%)</label>
                <input type="number" id="inflationRate" value="4" min="0" max="15" step="0.5" oninput="calculateFIRE()">
            </div>

            <div class="input-group">
                <label>Monthly Expenses saat Pensiun (Rp)</label>
                <input type="text" id="monthlyExpenses" placeholder="cth: 8.000.000" oninput="fireFmt(this); calculateFIRE()">
            </div>

            <div class="info-box">
                <strong>📐 Rumus FIRE Number</strong><br>
                FIRE Number = Pengeluaran Tahunan ÷ 4%<br>
                Berdasarkan <em>Safe Withdrawal Rate (SWR)</em> 4%
            </div>
        </div>

        <div class="calculator-results">
            <h3>Results</h3>

            <div id="firePlaceholder" class="calc-placeholder">
                <span class="ph-icon">🔥</span>
                Isi data di kiri untuk melihat proyeksi FIRE kamu
            </div>

            <div id="fireResultSection" style="display:none;">
                <div class="fire-number-card">
                    <div class="fire-card-label">🎯 FIRE Number</div>
                    <div class="fire-card-value" id="fireNumber">—</div>
                </div>

                <div class="fire-progress-wrap">
                    <div class="fire-progress-labels">
                        <span>Progress saat ini</span>
                        <span id="fireProgressPct" class="fire-progress-pct">0%</span>
                    </div>
                    <div class="fire-track">
                        <div class="fire-fill" id="fireFill" style="width:0%;"></div>
                    </div>
                </div>

                <div class="fire-stats-grid">
                    <div class="fire-stat">
                        <div class="fire-stat-label">FIRE Age</div>
                        <div class="fire-stat-value" id="fireAtAge">—</div>
                    </div>
                    <div class="fire-stat">
                        <div class="fire-stat-label">Sisa Waktu</div>
                        <div class="fire-stat-value" id="fireYearsLeft">—</div>
                    </div>
                    <div class="fire-stat">
                        <div class="fire-stat-label">Real Return</div>
                        <div class="fire-stat-value" id="resRealReturn">—</div>
                    </div>
                </div>

                <div class="result-row"><span>Portfolio Saat Ini</span><span id="resCurrentSavings">—</span></div>
                <div class="result-row"><span>Monthly Investment</span><span id="resMonthlySavings">—</span></div>
                <div class="result-row"><span>Pengeluaran/Tahun (Pensiun)</span><span id="resAnnualExpenses">—</span></div>
                <div class="result-row"><span>Safe Withdrawal Rate</span><span>4%</span></div>
            </div>
        </div>
    </div>
</div>

<style>
.fire-number-card { background: linear-gradient(135deg, #ff6b35, #e74c3c); color: #fff; border-radius: 12px; padding: 1.25rem 1rem; text-align: center; margin-bottom: 1.25rem; }
.fire-card-label { font-size: 0.75rem; font-weight: 600; opacity: 0.85; text-transform: uppercase; letter-spacing: 0.6px; }
.fire-card-value { font-size: 1.7rem; font-weight: 800; margin-top: 0.25rem; letter-spacing: -0.5px; }
.fire-progress-wrap { margin: 0 0 1.25rem 0; }
.fire-progress-labels { display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--secondary); font-weight: 600; margin-bottom: 6px; }
.fire-progress-pct { color: #e74c3c; }
.fire-track { height: 10px; background: var(--border); border-radius: 10px; overflow: hidden; }
.fire-fill { height: 100%; background: linear-gradient(90deg, #f39c12, #e74c3c); border-radius: 10px; transition: width 0.6s ease; min-width: 2px; }
.fire-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 1.25rem; }
.fire-stat { background: var(--theme); border: 1px solid var(--border); border-radius: 10px; padding: 10px 8px; text-align: center; }
.fire-stat-label { font-size: 0.68rem; font-weight: 600; color: var(--secondary); text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 4px; }
.fire-stat-value { font-size: 0.95rem; font-weight: 700; color: var(--primary); }
</style>

<script>
function fireFmt(el) {
    const raw = el.value.replace(/[^0-9]/g, '');
    el.value = raw ? parseInt(raw).toLocaleString('id-ID') : '';
}
function fireParse(str) {
    return parseInt((str || '0').replace(/[^0-9]/g, '')) || 0;
}
function fireFmtShort(n) {
    if (n >= 1e12) return 'Rp\u00a0' + (n / 1e12).toFixed(2) + '\u00a0T';
    if (n >= 1e9)  return 'Rp\u00a0' + (n / 1e9).toFixed(2) + '\u00a0M';
    if (n >= 1e6)  return 'Rp\u00a0' + (n / 1e6).toFixed(1) + '\u00a0Jt';
    return 'Rp\u00a0' + Math.round(n).toLocaleString('id-ID');
}
function calculateFIRE() {
    const currentAge = parseInt(document.getElementById('currentAge').value) || 25;
    const currentSavings = fireParse(document.getElementById('currentSavings').value);
    const monthlySavings = fireParse(document.getElementById('monthlySavings').value);
    const annualReturn = (parseFloat(document.getElementById('annualReturn').value) || 12) / 100;
    const inflationRate = (parseFloat(document.getElementById('inflationRate').value) || 4) / 100;
    const monthlyExpenses = fireParse(document.getElementById('monthlyExpenses').value);
    const placeholder = document.getElementById('firePlaceholder');
    const resultSection = document.getElementById('fireResultSection');
    if (monthlySavings <= 0 || monthlyExpenses <= 0) {
        placeholder.style.display = '';
        resultSection.style.display = 'none';
        return;
    }
    const realReturn = (1 + annualReturn) / (1 + inflationRate) - 1;
    const monthlyRate = realReturn / 12;
    const annualExpenses = monthlyExpenses * 12;
    const fireNumber = annualExpenses / 0.04;

    let fireAge = currentAge;
    let portfolio = currentSavings;
    while (fireAge < 100 && portfolio < fireNumber) {
        for (let m = 0; m < 12; m++) portfolio = portfolio * (1 + monthlyRate) + monthlySavings;
        fireAge++;
    }
    const currentProgress = Math.min(100, (currentSavings / fireNumber) * 100);
    const yearsLeft = Math.max(0, fireAge - currentAge);

    document.getElementById('fireNumber').textContent = fireFmtShort(fireNumber);
    document.getElementById('resCurrentSavings').textContent = fireFmtShort(currentSavings);
    document.getElementById('resMonthlySavings').textContent = fireFmtShort(monthlySavings);
    document.getElementById('resAnnualExpenses').textContent = fireFmtShort(annualExpenses);
    document.getElementById('resRealReturn').textContent = (realReturn * 100).toFixed(2) + '%';
    document.getElementById('fireAtAge').textContent = fireAge < 100 ? fireAge + ' thn' : '>100 thn';
    document.getElementById('fireYearsLeft').textContent = yearsLeft > 0 ? yearsLeft + ' thn lagi' : '✅ Sudah!';
    const pct = currentProgress.toFixed(1);
    document.getElementById('fireFill').style.width = pct + '%';
    document.getElementById('fireProgressPct').textContent = pct + '%';
    placeholder.style.display = 'none';
    resultSection.style.display = '';
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('currentSavings').value = '50.000.000';
    document.getElementById('monthlySavings').value = '3.000.000';
    document.getElementById('monthlyExpenses').value = '8.000.000';
    calculateFIRE();
});
</script>
