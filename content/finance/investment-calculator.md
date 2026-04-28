---
title: "Investment Calculator"
date: 2025-10-12T10:00:00+07:00
draft: false
description: "Calculate your investment returns with our comprehensive investment calculator"
markup: "html"
---

<div class="calculator-page">
    <header class="calculator-header">
        <h1>💰 Investment Calculator</h1>
        <p>Calculate how much your investment will grow over time</p>
    </header>

    <div class="calculator-container">
        <div class="calculator-inputs">
            <div class="input-group">
                <label for="initial-investment">Initial Investment (Rp)</label>
                <input type="number" id="initial-investment" placeholder="1000000" min="0" step="100000">
            </div>

            <div class="input-group">
                <label for="monthly-investment">Monthly Investment (Rp)</label>
                <input type="number" id="monthly-investment" placeholder="500000" min="0" step="100000">
            </div>

            <div class="input-group">
                <label for="annual-rate">Annual Interest Rate (%)</label>
                <input type="number" id="annual-rate" placeholder="12" min="0" max="100" step="0.1">
                <span class="hint">Average annual return (e.g., 12% for stock market)</span>
            </div>

            <div class="input-group">
                <label for="investment-years">Investment Period (Years)</label>
                <input type="number" id="investment-years" placeholder="10" min="1" max="50" step="1">
            </div>

            <button id="calculate-investment" class="calc-button">Calculate</button>
        </div>

        <div class="calculator-results" id="investment-results">
            <h3>Results</h3>
            <div class="result-item">
                <span class="result-label">Total Investment</span>
                <span class="result-value" id="total-invested">Rp 0</span>
            </div>
            <div class="result-item">
                <span class="result-label">Total Interest Earned</span>
                <span class="result-value" id="total-interest">Rp 0</span>
            </div>
            <div class="result-item highlight">
                <span class="result-label">Future Value</span>
                <span class="result-value" id="future-value">Rp 0</span>
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
}

.calculator-inputs {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 12px;
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
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const calcBtn = document.getElementById('calculate-investment');
    calcBtn.addEventListener('click', calculateInvestment);
});

function calculateInvestment() {
    const initial = parseFloat(document.getElementById('initial-investment').value) || 0;
    const monthly = parseFloat(document.getElementById('monthly-investment').value) || 0;
    const annualRate = parseFloat(document.getElementById('annual-rate').value) / 100 || 0;
    const years = parseFloat(document.getElementById('investment-years').value) || 0;

    const months = years * 12;
    const monthlyRate = annualRate / 12;

    // Future value of initial investment
    const fvInitial = initial * Math.pow(1 + monthlyRate, months);

    // Future value of monthly investments (annuity)
    const fvMonthly = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

    const futureValue = fvInitial + fvMonthly;
    const totalInvested = initial + (monthly * months);
    const totalInterest = futureValue - totalInvested;

    document.getElementById('total-invested').textContent = formatCurrency(totalInvested);
    document.getElementById('total-interest').textContent = formatCurrency(totalInterest);
    document.getElementById('future-value').textContent = formatCurrency(futureValue);
}

function formatCurrency(value) {
    return 'Rp ' + value.toLocaleString('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}
</script>
