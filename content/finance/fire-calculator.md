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
        <p>Financial Independence, Retire Early — kapan kamu bisa bebas finansial?</p>
    </header>

    <div class="calculator-container">
        <div class="calculator-inputs">
            <h3>Input</h3>

            <div class="input-group">
                <label>Umur Sekarang</label>
                <input type="number" id="currentAge" value="25" min="18" max="70">
            </div>

            <div class="input-group">
                <label>Tabungan Saat Ini (Rp)</label>
                <input type="text" id="currentSavings" placeholder="cth: 100.000.000" oninput="formatNum(this)">
            </div>

            <div class="input-group">
                <label>Monthly Savings / Investasi (Rp)</label>
                <input type="text" id="monthlySavings" placeholder="cth: 5.000.000" oninput="formatNum(this)">
            </div>

            <div class="input-group">
                <label>Expected Annual Return (%)</label>
                <input type="number" id="annualReturn" value="12" min="1" max="30" step="0.5">
            </div>

            <div class="input-group">
                <label>Inflation Rate (%)</label>
                <input type="number" id="inflationRate" value="4" min="0" max="15" step="0.5">
            </div>

            <div class="input-group">
                <label>Monthly Expenses Saat Pensiun (Rp)</label>
                <input type="text" id="monthlyExpenses" placeholder="cth: 10.000.000" oninput="formatNum(this)">
            </div>

            <button class="calc-btn" onclick="calculateFIRE()">Hitung FIRE Number</button>
        </div>

        <div class="calculator-results">
            <h3>Hasil</h3>

            <div id="resultSection" style="display:none;">
                <div class="result-highlight">
                    <div class="label">🎯 Target FIRE Number</div>
                    <div class="value" id="fireNumber">-</div>
                </div>

                <div class="result-row"><span>Umur Sekarang</span><span id="resCurrentAge">-</span></div>
                <div class="result-row"><span>Tabungan Saat Ini</span><span id="resCurrentSavings">-</span></div>
                <div class="result-row"><span>Monthly Savings</span><span id="resMonthlySavings">-</span></div>
                <div class="result-row"><span>Real Return (After Inflation)</span><span id="resRealReturn">-</span></div>
                <div class="result-row"><span>Annual Expenses (Future)</span><span id="resAnnualExpenses">-</span></div>
                <div class="result-row"><span>Safe Withdrawal Rate</span><span>4%</span></div>
                <div class="result-row highlight"><span>Est. FIRE Age</span><span id="fireAtAge">-</span></div>

                <div class="progress-bar-wrap">
                    <label style="margin-bottom:8px;display:block;">📊 Progress</label>
                    <div class="progress-bar" id="progressBar" style="width:0%;">0%</div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
.result-highlight { background: linear-gradient(135deg, #4caf50, #2e7d32); color: white; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 16px; }
.result-highlight .value { font-size: 1.8rem; font-weight: 700; }
.result-highlight .label { font-size: 0.85rem; opacity: 0.9; }
.result-section .result-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--border); font-size: 0.9rem; }
.result-section .result-row span:first-child { color: var(--secondary); }
.result-section .result-row.highlight span { font-weight: 700; color: var(--accent); }
.progress-bar-wrap { margin-top: 12px; }
.progress-bar { height: 24px; background: linear-gradient(90deg, #4caf50, #81c784); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8rem; font-weight: 600; transition: width 0.5s ease; }
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

function calculateFIRE() {
    const currentAge = parseInt(document.getElementById('currentAge').value) || 25;
    const currentSavings = parseNum(document.getElementById('currentSavings').value);
    const monthlySavings = parseNum(document.getElementById('monthlySavings').value);
    const annualReturn = (parseFloat(document.getElementById('annualReturn').value) || 12) / 100;
    const inflationRate = (parseFloat(document.getElementById('inflationRate').value) || 4) / 100;
    const monthlyExpenses = parseNum(document.getElementById('monthlyExpenses').value);

    if (currentSavings <= 0 || monthlySavings <= 0 || monthlyExpenses <= 0) {
        alert('Masukkan nilai yang valid.'); return;
    }

    const realReturn = (1 + annualReturn) / (1 + inflationRate) - 1;
    const monthlyRate = realReturn / 12;

    // FIRE number = annual expenses / SWR
    const annualExpensesFuture = monthlyExpenses * 12; // simplified, no inflation here
    const fireNumber = annualExpensesFuture / 0.04;

    // Find when FIRE is reached
    let fireReachedAge = currentAge;
    let portfolio = currentSavings;
    while (fireReachedAge < 100 && portfolio < fireNumber) {
        for (let m = 0; m < 12; m++) {
            portfolio = portfolio * (1 + monthlyRate) + monthlySavings;
        }
        fireReachedAge++;
    }

    const progress = Math.min(100, (portfolio / fireNumber) * 100);

    document.getElementById('fireNumber').textContent = formatRupiah(fireNumber);
    document.getElementById('resCurrentAge').textContent = `${currentAge} tahun`;
    document.getElementById('resCurrentSavings').textContent = formatRupiah(currentSavings);
    document.getElementById('resMonthlySavings').textContent = formatRupiah(monthlySavings);
    document.getElementById('resRealReturn').textContent = `${(realReturn * 100).toFixed(2)}%`;
    document.getElementById('resAnnualExpenses').textContent = formatRupiah(annualExpensesFuture);
    document.getElementById('fireAtAge').textContent = portfolio >= fireNumber ? `✅ ${fireReachedAge} tahun` : `⏳ ${fireReachedAge} tahun`;

    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = `${progress}%`;
    progressBar.textContent = `${progress.toFixed(1)}%`;

    document.getElementById('resultSection').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('currentSavings').value = '50.000.000';
    document.getElementById('monthlySavings').value = '3.000.000';
    document.getElementById('monthlyExpenses').value = '8.000.000';
    calculateFIRE();
});
</script>
