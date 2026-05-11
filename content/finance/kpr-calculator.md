---
title: "KPR Calculator"
date: 2025-10-12T10:00:00+07:00
draft: false
description: "Calculate your mortgage/home loan installments with our comprehensive KPR calculator"
markup: "html"
---

<div class="calculator-page">
    <header class="calculator-header">
        <h1>🏠 KPR Calculator</h1>
        <p>Calculate your mortgage/home loan installments and total interest</p>
    </header>

    <div class="calculator-container">
        <div class="calculator-inputs">
            <div class="input-group">
                <label for="house-price">House Price (Rp)</label>
                <input type="number" id="house-price" placeholder="1000000000" min="0" step="10000000">
                <span class="hint">Total price of the property you want to buy</span>
            </div>

            <div class="input-group">
                <label for="down-payment-percent">Down Payment (%)</label>
                <input type="number" id="down-payment-percent" placeholder="20" min="5" max="100" step="1">
                <span class="hint">Percentage of house price as down payment (min. 5%)</span>
            </div>

            <div class="input-group">
                <label for="loan-tenor">Loan Tenor (Years)</label>
                <input type="number" id="loan-tenor" placeholder="20" min="1" max="30" step="1">
                <span class="hint">Duration of your home loan in years</span>
            </div>

            <div class="input-group">
                <label for="interest-rate">Annual Interest Rate (%)</label>
                <input type="number" id="interest-rate" placeholder="8.5" min="1" max="30" step="0.1">
                <span class="hint">Bank's annual interest rate for KPR</span>
            </div>

            <div class="input-group">
                <label for="insurance-cost">Annual Insurance Cost (Rp)</label>
                <input type="number" id="insurance-cost" placeholder="5000000" min="0" step="100000">
                <span class="hint">Annual property and life insurance (optional)</span>
            </div>

            <button id="calculate-kpr" class="calc-button">Calculate</button>
        </div>

        <div class="calculator-results" id="kpr-results">
            <h3>Results</h3>
            <div class="result-item">
                <span class="result-label">House Price</span>
                <span class="result-value" id="result-house-price">Rp 0</span>
            </div>
            <div class="result-item">
                <span class="result-label">Down Payment</span>
                <span class="result-value" id="result-down-payment">Rp 0</span>
            </div>
            <div class="result-item">
                <span class="result-label">Loan Amount (Pinjaman)</span>
                <span class="result-value" id="result-loan-amount">Rp 0</span>
            </div>
            <div class="result-item">
                <span class="result-label">Monthly Installment (Angsuran)</span>
                <span class="result-value" id="result-monthly-installment">Rp 0</span>
            </div>
            <div class="result-item">
                <span class="result-label">Total Interest</span>
                <span class="result-value" id="result-total-interest">Rp 0</span>
            </div>
            <div class="result-item">
                <span class="result-label">Total Insurance</span>
                <span class="result-value" id="result-total-insurance">Rp 0</span>
            </div>
            <div class="result-item highlight">
                <span class="result-label">Total Cost (Total Biaya)</span>
                <span class="result-value" id="result-total-cost">Rp 0</span>
            </div>
        </div>
    </div>

    <div class="amortization-section" id="amortization-section" style="display: none;">
        <h3>📊 Amortization Schedule (Tabel Angsuran)</h3>
        <div class="table-wrapper">
            <table id="amortization-table">
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Installment</th>
                        <th>Interest</th>
                        <th>Principal</th>
                        <th>Remaining Balance</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
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

    .table-wrapper {
        overflow-x: auto;
    }
    
    table {
        font-size: 0.85rem;
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

/* Amortization Table */
.amortization-section {
    margin-top: 30px;
    background: #fff;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.amortization-section h3 {
    margin-bottom: 20px;
    color: #333;
}

.table-wrapper {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
}

thead {
    background: #f8f9fa;
}

th, td {
    padding: 12px 10px;
    text-align: right;
    border-bottom: 1px solid #eee;
}

th {
    font-weight: 600;
    color: #333;
}

th:first-child, td:first-child {
    text-align: left;
}

tbody tr:hover {
    background: #f8f9fa;
}

tbody tr:nth-child(even) {
    background: #fafbfc;
}

tbody tr:nth-child(even):hover {
    background: #f0f4f8;
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

/* Download Button */
.download-btn {
    margin-top: 15px;
    padding: 10px 20px;
    background: #28a745;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;
}

.download-btn:hover {
    background: #218838;
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
    const calcBtn = document.getElementById('calculate-kpr');
    calcBtn.addEventListener('click', calculateKPR);
});

function calculateKPR() {
    const housePrice = parseFloat(document.getElementById('house-price').value) || 0;
    const downPaymentPercent = parseFloat(document.getElementById('down-payment-percent').value) || 0;
    const loanTenor = parseFloat(document.getElementById('loan-tenor').value) || 0;
    const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100 || 0;
    const annualInsurance = parseFloat(document.getElementById('insurance-cost').value) || 0;

    // Calculations
    const downPayment = housePrice * (downPaymentPercent / 100);
    const loanAmount = housePrice - downPayment;
    const months = loanTenor * 12;
    const monthlyRate = interestRate / 12;

    // Monthly installment using annuity formula
    // M = P * [r(1+r)^n] / [(1+r)^n - 1]
    let monthlyInstallment;
    if (monthlyRate === 0) {
        monthlyInstallment = loanAmount / months;
    } else {
        monthlyInstallment = loanAmount * (Math.pow(1 + monthlyRate, months) * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1);
    }

    const totalInstallments = monthlyInstallment * months;
    const totalInterest = totalInstallments - loanAmount;
    const totalInsurance = annualInsurance * loanTenor;
    const totalCost = housePrice + totalInterest + totalInsurance;

    // Display results
    document.getElementById('result-house-price').innerHTML = formatCurrency(housePrice) + '<span class="terbilang">(' + numberToWords(housePrice) + ')</span>';
    document.getElementById('result-down-payment').innerHTML = formatCurrency(downPayment) + '<span class="terbilang">(' + numberToWords(downPayment) + ')</span>';
    document.getElementById('result-loan-amount').innerHTML = formatCurrency(loanAmount) + '<span class="terbilang">(' + numberToWords(loanAmount) + ')</span>';
    document.getElementById('result-monthly-installment').innerHTML = formatCurrency(monthlyInstallment) + '<span class="terbilang">(' + numberToWords(monthlyInstallment) + ')</span>';
    document.getElementById('result-total-interest').innerHTML = formatCurrency(totalInterest) + '<span class="terbilang">(' + numberToWords(totalInterest) + ')</span>';
    document.getElementById('result-total-insurance').innerHTML = formatCurrency(totalInsurance) + '<span class="terbilang">(' + numberToWords(totalInsurance) + ')</span>';
    document.getElementById('result-total-cost').innerHTML = formatCurrency(totalCost) + '<span class="terbilang">(' + numberToWords(totalCost) + ')</span>';

    // Generate amortization table
    generateAmortizationTable(loanAmount, monthlyInstallment, monthlyRate, months);
}

function generateAmortizationTable(principal, monthlyInstallment, monthlyRate, months) {
    const tbody = document.querySelector('#amortization-table tbody');
    tbody.innerHTML = '';
    
    let balance = principal;
    const maxRows = Math.min(months, 360); // Limit to 30 years (360 months) for performance
    
    for (let month = 1; month <= maxRows; month++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = monthlyInstallment - interestPayment;
        balance = Math.max(0, balance - principalPayment);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${month}</td>
            <td>${formatCurrency(monthlyInstallment)}</td>
            <td>${formatCurrency(interestPayment)}</td>
            <td>${formatCurrency(principalPayment)}</td>
            <td>${formatCurrency(balance)}</td>
        `;
        tbody.appendChild(row);
        
        if (balance <= 0) break;
    }
    
    // Show amortization section
    document.getElementById('amortization-section').style.display = 'block';
    
    // Add download button if not exists
    const section = document.getElementById('amortization-section');
    if (!section.querySelector('.download-btn')) {
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'download-btn';
        downloadBtn.textContent = '📥 Download CSV';
        downloadBtn.addEventListener('click', downloadCSV);
        section.appendChild(downloadBtn);
    }
}

function downloadCSV() {
    const table = document.getElementById('amortization-table');
    const rows = table.querySelectorAll('tr');
    
    let csv = 'Month,Monthly Installment,Interest,Principal,Remaining Balance\n';
    
    rows.forEach((row, index) => {
        if (index === 0) return; // Skip header
        const cells = row.querySelectorAll('td');
        const rowData = Array.from(cells).map(cell => {
            let text = cell.textContent.trim();
            // Remove "Rp " and dots for clean CSV
            text = text.replace('Rp ', '').replace(/\./g, '');
            return text;
        });
        csv += rowData.join(',') + '\n';
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kpr_amortization_schedule.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}
</script>