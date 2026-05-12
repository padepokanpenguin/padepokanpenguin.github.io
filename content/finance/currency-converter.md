---
title: "Currency Converter"
date: 2025-10-12T10:00:00+07:00
draft: false
description: "Konversi mata uang asing ke Rupiah Indonesia dan sebaliknya dengan kurs real-time."
markup: html
---

<div class="calculator-page">
    <header class="calculator-header">
        <h1>💱 Currency Converter</h1>
        <p>Konversi mata uang dengan kurs real-time. Data kurs dari exchangerate-api.com</p>
    </header>

    <div class="calculator-container">
        <div class="calculator-inputs">
            <h3>Input</h3>

            <div class="input-group">
                <label for="fromCurrency">Dari Mata Uang</label>
                <select id="fromCurrency">
                    <option value="USD">🇺🇸 USD - US Dollar</option>
                    <option value="EUR">🇪🇺 EUR - Euro</option>
                    <option value="GBP">🇬🇧 GBP - British Pound</option>
                    <option value="JPY">🇯🇵 JPY - Japanese Yen</option>
                    <option value="AUD">🇦🇺 AUD - Australian Dollar</option>
                    <option value="SGD">🇸🇬 SGD - Singapore Dollar</option>
                    <option value="MYR">🇲🇾 MYR - Malaysian Ringgit</option>
                    <option value="THB">🇹🇭 THB - Thai Baht</option>
                    <option value="KRW">🇰🇷 KRW - South Korean Won</option>
                    <option value="CNY">🇨🇳 CNY - Chinese Yuan</option>
                    <option value="IDR" selected>🇮🇩 IDR - Indonesian Rupiah</option>
                    <option value="INR">🇮🇳 INR - Indian Rupee</option>
                    <option value="SAR">🇸🇦 SAR - Saudi Riyal</option>
                    <option value="AED">🇦🇪 AED - UAE Dirham</option>
                </select>
            </div>

            <button class="swap-btn" onclick="swapCurrencies()">⇅ Tukar Posisi</button>

            <div class="input-group">
                <label for="toCurrency">Ke Mata Uang</label>
                <select id="toCurrency">
                    <option value="USD" selected>🇺🇸 USD - US Dollar</option>
                    <option value="EUR">🇪🇺 EUR - Euro</option>
                    <option value="GBP">🇬🇧 GBP - British Pound</option>
                    <option value="JPY">🇯🇵 JPY - Japanese Yen</option>
                    <option value="AUD">🇦🇺 AUD - Australian Dollar</option>
                    <option value="SGD">🇸🇬 SGD - Singapore Dollar</option>
                    <option value="MYR">🇲🇾 MYR - Malaysian Ringgit</option>
                    <option value="THB">🇹🇭 THB - Thai Baht</option>
                    <option value="KRW">🇰🇷 KRW - South Korean Won</option>
                    <option value="CNY">🇨🇳 CNY - Chinese Yuan</option>
                    <option value="IDR">🇮🇩 IDR - Indonesian Rupiah</option>
                    <option value="INR">🇮🇳 INR - Indian Rupee</option>
                    <option value="SAR">🇸🇦 SAR - Saudi Riyal</option>
                    <option value="AED">🇦🇪 AED - UAE Dirham</option>
                </select>
            </div>

            <div class="input-group">
                <label for="amount">Jumlah</label>
                <input type="number" id="amount" placeholder="1000000" min="0" step="1000" oninput="convert()">
            </div>

            <div id="errorMsg" class="error-msg" style="display:none;"></div>
        </div>

        <div class="calculator-results">
            <h3>Results</h3>
            <div class="result-item">
                <span class="result-label">Hasil Konversi</span>
                <span class="result-value" id="resultAmount" style="color: #4a90e2; font-size: 1.3rem;">Loading...</span>
            </div>
            <div class="result-item highlight">
                <span class="result-label">Kurs</span>
                <span class="result-value" id="resultRate" style="color: #4a90e2;">-</span>
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
    .swap-btn {
        padding: 10px;
        font-size: 0.9rem;
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

.swap-btn {
    display: block;
    width: 100%;
    padding: 12px;
    background: #6c757d;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;
    text-align: center;
    margin-bottom: 20px;
}

.swap-btn:hover {
    background: #5a6268;
}

.error-msg {
    color: #dc3545;
    padding: 10px;
    background: #f8d7da;
    border-radius: 6px;
    font-size: 0.9rem;
    margin-top: 10px;
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

.result-label {
    color: #666;
}

.result-value {
    font-weight: 700;
    color: #333;
}
</style>

<script>
let exchangeRates = {};
let lastFetch = 0;
const CACHE_TTL = 10 * 60 * 1000;

// Fallback rates: 1 IDR = X currency (set only when API fails)
const FALLBACK_RATES = {
    'USD': 0.000062,  // 1 IDR = 0.000062 USD  →  1 USD ≈ Rp 16.000
    'EUR': 0.000057,
    'GBP': 0.000049,
    'JPY': 0.0092,
    'AUD': 0.000095,
    'SGD': 0.000084,
    'MYR': 0.00028,
    'THB': 0.0022,
    'KRW': 0.083,
    'CNY': 0.00045,
    'IDR': 1,
    'INR': 0.0052,
    'SAR': 0.00023,
    'AED': 0.00023
};

async function fetchRates() {
  const now = Date.now();
  if (now - lastFetch < CACHE_TTL) return;

  try {
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/IDR');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    // data.rates[curr] = X currency per 1 IDR
    // e.g. data.rates['USD'] ≈ 0.000062  →  1 IDR = 0.000062 USD
    const currencies = ['USD','EUR','GBP','JPY','AUD','SGD','MYR','THB','KRW','CNY','IDR','INR','SAR','AED'];
    currencies.forEach(curr => {
      exchangeRates[curr] = data.rates[curr];
    });
    lastFetch = now;
    document.getElementById('errorMsg').style.display = 'none';
  } catch (e) {
    // Use fallback — these are rates PER 1 IDR
    exchangeRates = { ...FALLBACK_RATES };
    lastFetch = now; // Don't spam API on failure
    showError('Gagal fetch kurs real-time. Menggunakan estimasi fallback.');
  }
}

function showError(msg) {
  const el = document.getElementById('errorMsg');
  el.textContent = msg;
  el.style.display = 'block';
}

function formatCurrency(amount, currency) {
  if (!isFinite(amount) || isNaN(amount)) return '-';
  if (currency === 'IDR') {
    return 'Rp ' + Math.round(amount).toLocaleString('id-ID');
  }
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2, maximumFractionDigits: 2
  }).format(amount) + ' ' + currency;
}

function swapCurrencies() {
  const from = document.getElementById('fromCurrency');
  const to = document.getElementById('toCurrency');
  const temp = from.value;
  from.value = to.value;
  to.value = temp;
  convert();
}

async function convert() {
  await fetchRates();

  const from = document.getElementById('fromCurrency').value;
  const to = document.getElementById('toCurrency').value;
  const amountStr = document.getElementById('amount').value.replace(/[^0-9]/g, '');
  const amount = parseFloat(amountStr) || 0;

  if (amount <= 0) {
    document.getElementById('resultAmount').textContent = '-';
    document.getElementById('resultRate').textContent = 'Masukkan jumlah untuk konversi';
    return;
  }

  if (!exchangeRates[from] || !exchangeRates[to]) {
    document.getElementById('resultAmount').textContent = '-';
    document.getElementById('resultRate').textContent = 'Kurs belum tersedia';
    return;
  }

  // Convert to IDR first, then to target currency
  // exchangeRates[curr] = X currency per 1 IDR
  const inIdr = from === 'IDR' ? amount : amount / exchangeRates[from];
  const result = to === 'IDR' ? inIdr : inIdr * exchangeRates[to];

  // Display rate: 1 FROM = X TO
  const rate = exchangeRates[to] / (from === 'IDR' ? 1 : exchangeRates[from]);

  document.getElementById('resultAmount').textContent = formatCurrency(result, to);
  document.getElementById('resultRate').textContent = `1 ${from} = ${formatCurrency(rate, to)}`;
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('amount').addEventListener('input', convert);
    document.getElementById('fromCurrency').addEventListener('change', convert);
    document.getElementById('toCurrency').addEventListener('change', convert);
    convert();
});
</script>
