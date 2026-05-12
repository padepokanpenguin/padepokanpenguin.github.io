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
                <label for="currentAge">Umur Sekarang</label>
                <input type="number" id="currentAge" value="25" min="18" max="70">
            </div>

            <div class="input-group">
                <label for="currentSavings">Tabungan Saat Ini (Rp)</label>
                <input type="number" id="currentSavings" placeholder="100000000" min="0" step="1000000">
                <span class="hint">Total kekayaan saat ini (deposito, reksa dana, saham, dll)</span>
            </div>

            <div class="input-group">
                <label for="monthlySavings">Monthly Savings / Investasi (Rp)</label>
                <input type="number" id="monthlySavings" placeholder="5000000" min="0" step="500000">
                <span class="hint">Jumlah yang kamu investasikan setiap bulan</span>
            </div>

            <div class="input-group">
                <label for="annualReturn">Expected Annual Return (%)</label>
                <input type="number" id="annualReturn" value="12" min="1" max="30" step="0.5">
                <span class="hint">Rata-rata return tahunan (cth: 12% untuk saham, 8% untuk reksa dana campuran)</span>
            </div>

            <div class="input-group">
                <label for="inflationRate">Inflation Rate (%)</label>
                <input type="number" id="inflationRate" value="4" min="0" max="15" step="0.5">
                <span class="hint">Inflasi tahunan Indonesia (default: 4%)</span>
            </div>

            <div class="input-group">
                <label for="monthlyExpenses">Monthly Expenses Saat Pensiun (Rp)</label>
                <input type="number" id="monthlyExpenses" placeholder="10000000" min="0" step="500000">
                <span class="hint">Perkiraan pengeluaran bulanan setelah pensiun</span>
            </div>

            <button id="calculate-fire" class="calc-button">Hitung FIRE Number</button>
        </div>

        <div class="calculator-results">
            <h3>Results</h3>

            <div class="result-item">
                <span class="result-label">🎯 Target FIRE Number</span>
                <span class="result-value" id="fireNumber" style="color: #4a90e2; font-size: 1.3rem;">-</span>
            </div>
            <div class="result-item">
                <span class="result-label">Umur Sekarang</span>
                <span class="result-value" id="resCurrentAge">-</span>
            </div>
            <div class="result-item">
                <span class="result-label">Tabungan Saat Ini</span>
                <span class="result-value" id="resCurrentSavings">-</span>
            </div>
            <div class="result-item">
                <span class="result-label">Monthly Savings</span>
                <span class="result-value" id="resMonthlySavings">-</span>
            </div>
            <div class="result-item">
                <span class="result-label">Real Return (After Inflation)</span>
                <span class="result-value" id="resRealReturn">-</span>
            </div>
            <div class="result-item">
                <span class="result-label">Annual Expenses (Future)</span>
                <span class="result-value" id="resAnnualExpenses">-</span>
            </div>
            <div class="result-item">
                <span class="result-label">Safe Withdrawal Rate</span>
                <span class="result-value">4%</span>
            </div>
            <div class="result-item highlight">
                <span class="result-label">Est. FIRE Age</span>
                <span class="result-value" id="fireAtAge">-</span>
            </div>

            <div class="progress-bar-wrap">
                <span class="result-label" style="display:block;margin-bottom:8px;">📊 Progress Menuju FIRE</span>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" id="progressBarFill" style="width:0%"></div>
                </div>
                <span id="progressText" style="font-size:0.8rem;color:#666;margin-top:4px;display:block;">0%</span>
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
    .input-group input {
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

.input-group input {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s;
    background: #fff;
}

.input-group input:focus {
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

.progress-bar-wrap {
    margin-top: 20px;
}

.progress-bar-bg {
    height: 24px;
    background: #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
}

.progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #4a90e2, #81c784);
    border-radius: 8px;
    transition: width 0.5s ease;
    display: flex;
    align-items: center;
}
</style>

<script>
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
        alert('Masukkan nilai yang valid.');
        return;
    }

    const realReturn = (1 + annualReturn) / (1 + inflationRate) - 1;
    const monthlyRate = realReturn / 12;

    // FIRE number = annual expenses / SWR
    const annualExpensesFuture = monthlyExpenses * 12;
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

    const progress = Math.min(100, (currentSavings / fireNumber) * 100);

    document.getElementById('fireNumber').textContent = formatRupiah(fireNumber);
    document.getElementById('resCurrentAge').textContent = `${currentAge} tahun`;
    document.getElementById('resCurrentSavings').textContent = formatRupiah(currentSavings);
    document.getElementById('resMonthlySavings').textContent = formatRupiah(monthlySavings);
    document.getElementById('resRealReturn').textContent = `${(realReturn * 100).toFixed(2)}%`;
    document.getElementById('resAnnualExpenses').textContent = formatRupiah(annualExpensesFuture);
    document.getElementById('fireAtAge').textContent = portfolio >= fireNumber
        ? `✅ ${fireReachedAge} tahun`
        : `⏳ ${fireReachedAge} tahun`;

    const progressFill = document.getElementById('progressBarFill');
    progressFill.style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `${progress.toFixed(1)}% — ${formatRupiah(currentSavings)} / ${formatRupiah(fireNumber)}`;
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('currentSavings').value = '50000000';
    document.getElementById('monthlySavings').value = '3000000';
    document.getElementById('monthlyExpenses').value = '8000000';
    document.getElementById('calculate-fire').addEventListener('click', calculateFIRE);
    calculateFIRE();
});
</script>
