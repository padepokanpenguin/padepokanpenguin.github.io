---
title: "Pension Calculator"
date: 2025-10-12T10:00:00+07:00
draft: false
description: "Plan your retirement with our pension calculator"
markup: "html"
---

<div class="calculator-page">
    <header class="calculator-header">
        <h1>🏠 Pension Calculator</h1>
        <p>Plan how much you need to save for a comfortable retirement</p>
    </header>

    <div class="calculator-container">
        <div class="calculator-inputs">
            <div class="input-group">
                <label for="current-age">Current Age</label>
                <input type="number" id="current-age" placeholder="25" min="18" max="80">
            </div>

            <div class="input-group">
                <label for="retirement-age">Target Retirement Age</label>
                <input type="number" id="retirement-age" placeholder="55" min="30" max="100">
            </div>

            <div class="input-group">
                <label for="current-savings">Current Savings (Rp)</label>
                <input type="number" id="current-savings" placeholder="100000000" min="0" step="1000000">
                <span class="hint">Your current total savings for retirement</span>
            </div>

            <div class="input-group">
                <label for="monthly-contribution">Monthly Contribution (Rp)</label>
                <input type="number" id="monthly-contribution" placeholder="2000000" min="0" step="100000">
                <span class="hint">How much you save each month</span>
            </div>

            <div class="input-group">
                <label for="expected-return">Expected Annual Return (%)</label>
                <input type="number" id="expected-return" placeholder="8" min="0" max="30" step="0.1">
                <span class="hint">Estimated yearly growth of your investments</span>
            </div>

            <div class="input-group">
                <label for="target-amount">Target Retirement Fund (Rp)</label>
                <input type="number" id="target-amount" placeholder="2000000000" min="0" step="10000000">
                <span class="hint">Amount you want to have at retirement</span>
            </div>

            <button id="calculate-pension" class="calc-button">Calculate</button>
        </div>

        <div class="calculator-results" id="pension-results">
            <h3>Results</h3>
            <div class="result-item">
                <span class="result-label">Years to Retirement</span>
                <span class="result-value" id="years-to-retirement">0 years</span>
            </div>
            <div class="result-item">
                <span class="result-label">Total Contributions</span>
                <span class="result-value" id="total-contributions">Rp 0</span>
            </div>
            <div class="result-item">
                <span class="result-label">Investment Growth</span>
                <span class="result-value" id="investment-growth">Rp 0</span>
            </div>
            <div class="result-item highlight">
                <span class="result-label">Projected Fund at Retirement</span>
                <span class="result-value" id="projected-fund">Rp 0</span>
            </div>
            <div class="result-item" id="goal-status">
                <span class="result-label">Status</span>
                <span class="result-value" id="goal-message">-</span>
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

#goal-status .result-value.on-track {
    color: #28a745;
}

#goal-status .result-value.behind {
    color: #dc3545;
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
    const calcBtn = document.getElementById('calculate-pension');
    calcBtn.addEventListener('click', calculatePension);
});

function calculatePension() {
    const currentAge = parseInt(document.getElementById('current-age').value) || 0;
    const retirementAge = parseInt(document.getElementById('retirement-age').value) || 0;
    const currentSavings = parseFloat(document.getElementById('current-savings').value) || 0;
    const monthlyContribution = parseFloat(document.getElementById('monthly-contribution').value) || 0;
    const annualReturn = parseFloat(document.getElementById('expected-return').value) / 100 || 0;
    const targetAmount = parseFloat(document.getElementById('target-amount').value) || 0;

    const yearsToRetirement = retirementAge - currentAge;
    const monthsToRetirement = yearsToRetirement * 12;
    const monthlyRate = annualReturn / 12;

    // Future value of current savings
    const fvSavings = currentSavings * Math.pow(1 + monthlyRate, monthsToRetirement);

    // Future value of monthly contributions
    const fvContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, monthsToRetirement) - 1) / monthlyRate);

    const projectedFund = fvSavings + fvContributions;
    const totalContributions = currentSavings + (monthlyContribution * monthsToRetirement);
    const investmentGrowth = projectedFund - totalContributions;

    document.getElementById('years-to-retirement').textContent = yearsToRetirement + ' years';
    document.getElementById('total-contributions').innerHTML = formatCurrency(totalContributions) + '<span class="terbilang">(' + numberToWords(totalContributions) + ')</span>';
    document.getElementById('investment-growth').innerHTML = formatCurrency(investmentGrowth) + '<span class="terbilang">(' + numberToWords(investmentGrowth) + ')</span>';
    document.getElementById('projected-fund').innerHTML = formatCurrency(projectedFund) + '<span class="terbilang">(' + numberToWords(projectedFund) + ')</span>';

    const goalMessage = document.getElementById('goal-message');
    const goalStatus = document.getElementById('goal-status');
    
    if (projectedFund >= targetAmount) {
        goalMessage.textContent = '✓ On Track!';
        goalMessage.className = 'result-value on-track';
        goalStatus.style.background = '#d4edda';
    } else {
        const shortfall = targetAmount - projectedFund;
        goalMessage.innerHTML = 'Need ' + formatCurrency(shortfall) + ' more<br><span class="terbilang">(' + numberToWords(shortfall) + ')</span>';
        goalMessage.className = 'result-value behind';
        goalStatus.style.background = '#f8d7da';
    }
    goalStatus.style.padding = '12px 0';
    goalStatus.style.borderRadius = '8px';
    goalStatus.style.marginTop = '10px';
}
</script>
