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
                <label>Dari Mata Uang</label>
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
                <label>Ke Mata Uang</label>
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
                <label>Jumlah</label>
                <input type="text" id="amount" value="1.000.000" oninput="convert()">
            </div>

            <div id="errorMsg" class="error-msg" style="display:none;"></div>
        </div>

        <div class="calculator-results">
            <h3>Hasil</h3>
            <div class="result-box">
                <div class="result-amount" id="resultAmount">Loading...</div>
                <div class="result-rate" id="resultRate"></div>
            </div>
        </div>
    </div>
</div>

<style>
.swap-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 10px; margin: 12px 0; background: var(--accent); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 0.95rem; }
.swap-btn:hover { opacity: 0.9; }
.result-box { background: var(--result-bg); border-radius: 8px; padding: 20px; text-align: center; margin-top: 16px; }
.result-amount { font-size: 1.8rem; font-weight: 700; color: var(--accent); }
.result-rate { font-size: 0.85rem; color: var(--secondary); margin-top: 6px; }
.error-msg { color: #dc3545; padding: 10px; background: #f8d7da; border-radius: 6px; margin-top: 10px; font-size: 0.9rem; }
</style>

<script>
let exchangeRates = {};
let lastFetch = 0;
const CACHE_TTL = 10 * 60 * 1000;

async function fetchRates() {
  const now = Date.now();
  if (Object.keys(exchangeRates).length > 0 && (now - lastFetch) < CACHE_TTL) return;

  try {
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/IDR');
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    const idrToUsd = data.rates['USD'];
    const currencies = ['USD','EUR','GBP','JPY','AUD','SGD','MYR','THB','KRW','CNY','IDR','INR','SAR','AED'];
    currencies.forEach(curr => {
      if (curr !== 'IDR') exchangeRates[curr] = data.rates[curr] / idrToUsd;
    });
    exchangeRates['IDR'] = 1 / idrToUsd;
    lastFetch = now;
    document.getElementById('errorMsg').style.display = 'none';
  } catch (e) {
    if (Object.keys(exchangeRates).length === 0) {
      exchangeRates = {
        'USD': 0.000062, 'EUR': 0.000057, 'GBP': 0.000049, 'JPY': 0.0092,
        'AUD': 0.000095, 'SGD': 0.000084, 'MYR': 0.00028, 'THB': 0.0022,
        'KRW': 0.083, 'CNY': 0.00045, 'IDR': 1, 'INR': 0.0052,
        'SAR': 0.00023, 'AED': 0.00023
      };
    }
    showError('Gagal fetch kurs real-time. Menggunakan estimasi.');
  }
}

function showError(msg) {
  const el = document.getElementById('errorMsg');
  el.textContent = msg;
  el.style.display = 'block';
}

function formatCurrency(amount, currency) {
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
    document.getElementById('resultAmount').textContent = '0.00';
    document.getElementById('resultRate').textContent = '';
    return;
  }

  const inIdr = from === 'IDR' ? amount : amount / exchangeRates[from];
  const result = to === 'IDR' ? inIdr : inIdr * exchangeRates[to];
  const rate = exchangeRates[to] / (from === 'IDR' ? 1 : exchangeRates[from]);

  document.getElementById('resultAmount').textContent = formatCurrency(result, to);
  document.getElementById('resultRate').textContent = `1 ${from} = ${formatCurrency(rate, to)}`;
}

document.addEventListener('DOMContentLoaded', convert);
</script>
