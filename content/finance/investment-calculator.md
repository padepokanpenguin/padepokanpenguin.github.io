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

/* Responsive - Tablet */
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

/* Responsive - Mobile Small */
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

/* Angka Terbilang */
.terbilang {
    font-size: 0.8rem;
    color: #888;
    font-style: italic;
    margin-top: 4px;
    display: block;
}

.result-item .result-value {
    display: block;
}

.result-item.highlight .terbilang {
    color: #4a90e2;
    font-style: normal;
    font-weight: 500;
}
</style>

<script>
// Fungsi angka bercerita (terbilang) untuk Rupiah
function numberToWords(num) {
    if (num === 0) return 'nol';
    
    num = Math.floor(num);
    if (num > 999999999999) return 'Angka terlalu besar';
    
    const ones = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan'];
    const tens = ['', '', 'dua puluh', 'tiga puluh', 'empat puluh', 'lima puluh', 'enam puluh', 'tujuh puluh', 'delapan puluh', 'sembilan puluh'];
    const teens = ['sepuluh', 'sebelas', 'dua belas', 'tiga belas', 'empat belas', 'lima belas', 'enam belas', 'tujuh belas', 'delapan belas', 'sembilan belas'];
    
    function convertChunk(n) {
        if (n === 0) return '';
        if (n < 10) return ones[n];
        if (n < 20) return teens[n - 10];
        if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
        if (n < 1000) return ones[Math.floor(n / 100)] + ' ratus' + (n % 100 !== 0 ? ' ' + convertChunk(n % 100) : '');
        if (n < 1000000) return convertChunk(Math.floor(n / 1000)) + ' ribu' + (n % 1000 !== 0 ? ' ' + convertChunk(n % 1000) : '');
        if (n < 1000000000) return convertChunk(Math.floor(n / 1000000)) + ' juta' + (n % 1000000 !== 0 ? ' ' + convertChunk(n % 1000000) : '');
        return convertChunk(Math.floor(n / 1000000000)) + ' miliar' + (n % 1000000000 !== 0 ? ' ' + convertChunk(n % 1000000000) : '');
    }
    
    return convertChunk(num);
}

function formatCurrency(value) {
    return 'Rp ' + value.toLocaleString('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

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

    document.getElementById('total-invested').innerHTML = formatCurrency(totalInvested) + '<span class="terbilang">(' + numberToWords(totalInvested) + ')</span>';
    document.getElementById('total-interest').innerHTML = formatCurrency(totalInterest) + '<span class="terbilang">(' + numberToWords(totalInterest) + ')</span>';
    document.getElementById('future-value').innerHTML = formatCurrency(futureValue) + '<span class="terbilang">(' + numberToWords(futureValue) + ')</span>';
}
</script>
