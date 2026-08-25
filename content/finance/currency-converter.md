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
        <p>Konversi mata uang real-time · Kurs dari exchangerate-api.com</p>
    </header>

    <div class="calculator-container">
        <div class="calculator-inputs">
            <h3>Input</h3>

            <div class="input-group">
                <label>Jumlah</label>
                <input type="text" id="amount" value="1.000.000" oninput="ccFmt(this); convert()">
            </div>

            <div class="input-group">
                <label>Dari</label>
                <select id="fromCurrency" onchange="convert()">
                    <option value="IDR" selected>🇮🇩 IDR — Indonesian Rupiah</option>
                    <option value="USD">🇺🇸 USD — US Dollar</option>
                    <option value="EUR">🇪🇺 EUR — Euro</option>
                    <option value="GBP">🇬🇧 GBP — British Pound</option>
                    <option value="JPY">🇯🇵 JPY — Japanese Yen</option>
                    <option value="AUD">🇦🇺 AUD — Australian Dollar</option>
                    <option value="SGD">🇸🇬 SGD — Singapore Dollar</option>
                    <option value="MYR">🇲🇾 MYR — Malaysian Ringgit</option>
                    <option value="THB">🇹🇭 THB — Thai Baht</option>
                    <option value="KRW">🇰🇷 KRW — South Korean Won</option>
                    <option value="CNY">🇨🇳 CNY — Chinese Yuan</option>
                    <option value="INR">🇮🇳 INR — Indian Rupee</option>
                    <option value="SAR">🇸🇦 SAR — Saudi Riyal</option>
                    <option value="AED">🇦🇪 AED — UAE Dirham</option>
                </select>
            </div>

            <button class="cc-swap-btn" onclick="swapCurrencies()">⇅ Tukar Posisi</button>

            <div class="input-group">
                <label>Ke</label>
                <select id="toCurrency" onchange="convert()">
                    <option value="USD" selected>🇺🇸 USD — US Dollar</option>
                    <option value="IDR">🇮🇩 IDR — Indonesian Rupiah</option>
                    <option value="EUR">🇪🇺 EUR — Euro</option>
                    <option value="GBP">🇬🇧 GBP — British Pound</option>
                    <option value="JPY">🇯🇵 JPY — Japanese Yen</option>
                    <option value="AUD">🇦🇺 AUD — Australian Dollar</option>
                    <option value="SGD">🇸🇬 SGD — Singapore Dollar</option>
                    <option value="MYR">🇲🇾 MYR — Malaysian Ringgit</option>
                    <option value="THB">🇹🇭 THB — Thai Baht</option>
                    <option value="KRW">🇰🇷 KRW — South Korean Won</option>
                    <option value="CNY">🇨🇳 CNY — Chinese Yuan</option>
                    <option value="INR">🇮🇳 INR — Indian Rupee</option>
                    <option value="SAR">🇸🇦 SAR — Saudi Riyal</option>
                    <option value="AED">🇦🇪 AED — UAE Dirham</option>
                </select>
            </div>

            <div id="ccUpdated" class="cc-updated" style="display:none;"></div>
            <div id="errorMsg" class="calc-error" style="display:none;"></div>
        </div>

        <div class="calculator-results">
            <h3>Hasil</h3>

            <div class="cc-result-box">
                <div id="ccLoading" class="cc-loading">
                    <div class="cc-spinner"></div>
                    <span>Memuat kurs...</span>
                </div>
                <div id="ccResult" style="display:none;">
                    <div class="cc-main-amount" id="resultAmount">—</div>
                    <div class="cc-rate-label" id="resultRate">—</div>
                </div>
            </div>

            <div id="ccQuickConvert" style="display:none;">
                <div class="cc-quick-title">Konversi Cepat</div>
                <div id="quickRows"></div>
            </div>
        </div>
    </div>
</div>

<style>
.cc-swap-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 0.6rem; margin: 0.5rem 0; background: var(--entry); color: var(--primary); border: 1.5px solid var(--border); border-radius: 8px; cursor: pointer; font-size: 0.9rem; font-family: inherit; font-weight: 600; transition: border-color 0.2s, background 0.2s; }
.cc-swap-btn:hover { border-color: #4a90e2; background: rgba(74,144,226,0.06); }
.cc-updated { font-size: 0.75rem; color: var(--secondary); margin-top: 0.5rem; opacity: 0.7; }
.cc-result-box { background: var(--theme); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; text-align: center; margin-bottom: 1rem; min-height: 90px; display: flex; align-items: center; justify-content: center; }
.cc-loading { display: flex; flex-direction: column; align-items: center; gap: 8px; color: var(--secondary); font-size: 0.875rem; }
.cc-spinner { width: 24px; height: 24px; border: 3px solid var(--border); border-top-color: #4a90e2; border-radius: 50%; animation: cc-spin 0.8s linear infinite; }
@keyframes cc-spin { to { transform: rotate(360deg); } }
.cc-main-amount { font-size: 1.8rem; font-weight: 800; color: #4a90e2; letter-spacing: -0.5px; }
.cc-rate-label { font-size: 0.82rem; color: var(--secondary); margin-top: 6px; }
.cc-quick-title { font-size: 0.72rem; font-weight: 600; color: var(--secondary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
.cc-quick-row { display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid var(--border); font-size: 0.875rem; }
.cc-quick-row:last-child { border-bottom: none; }
.cc-quick-row span:first-child { color: var(--secondary); }
.cc-quick-row span:last-child { font-weight: 600; color: var(--primary); }
</style>

<script>
const CC_CURRENCIES = ['IDR','USD','EUR','GBP','JPY','AUD','SGD','MYR','THB','KRW','CNY','INR','SAR','AED'];
let ccRates = {};
let ccLastFetch = 0;
const CC_CACHE_TTL = 10 * 60 * 1000;

async function ccFetchRates() {
    const now = Date.now();
    if (Object.keys(ccRates).length > 0 && (now - ccLastFetch) < CC_CACHE_TTL) return;
    try {
        const res = await fetch('https://api.exchangerate-api.com/v4/latest/IDR');
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        const idrToUsd = data.rates['USD'];
        CC_CURRENCIES.forEach(c => {
            ccRates[c] = c === 'IDR' ? 1 / idrToUsd : data.rates[c] / idrToUsd;
        });
        ccLastFetch = now;
        const updEl = document.getElementById('ccUpdated');
        updEl.textContent = '✓ Kurs diperbarui: ' + new Date().toLocaleTimeString('id-ID');
        updEl.style.display = '';
        document.getElementById('errorMsg').style.display = 'none';
    } catch (e) {
        if (Object.keys(ccRates).length === 0) {
            ccRates = { IDR: 1, USD: 0.000062, EUR: 0.000057, GBP: 0.000049, JPY: 0.0092, AUD: 0.000095, SGD: 0.000084, MYR: 0.00028, THB: 0.0022, KRW: 0.083, CNY: 0.00045, INR: 0.0052, SAR: 0.00023, AED: 0.00023 };
        }
        const errEl = document.getElementById('errorMsg');
        errEl.textContent = '⚠ Gagal fetch kurs real-time. Menggunakan estimasi terakhir.';
        errEl.style.display = '';
    }
}

function ccFmt(el) {
    const raw = el.value.replace(/[^0-9]/g, '');
    el.value = raw ? parseInt(raw).toLocaleString('id-ID') : '';
}

function ccFmtNum(amount, currency) {
    const decimals = ['JPY','KRW','IDR'].includes(currency) ? 0 : 2;
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(amount) + ' ' + currency;
}

function ccConvertAmount(amount, from, to) {
    const inIdr = from === 'IDR' ? amount : amount / ccRates[from];
    return to === 'IDR' ? inIdr : inIdr * ccRates[to];
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
    const loadingEl = document.getElementById('ccLoading');
    const resultEl = document.getElementById('ccResult');
    loadingEl.style.display = 'flex';
    resultEl.style.display = 'none';

    await ccFetchRates();

    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;
    const amountStr = document.getElementById('amount').value.replace(/[^0-9]/g, '');
    const amount = parseFloat(amountStr) || 0;

    loadingEl.style.display = 'none';
    resultEl.style.display = '';

    if (amount <= 0) {
        document.getElementById('resultAmount').textContent = '0.00 ' + to;
        document.getElementById('resultRate').textContent = '';
        document.getElementById('ccQuickConvert').style.display = 'none';
        return;
    }

    const result = ccConvertAmount(amount, from, to);
    const rate = ccConvertAmount(1, from, to);

    document.getElementById('resultAmount').textContent = ccFmtNum(result, to);
    document.getElementById('resultRate').textContent = '1 ' + from + ' = ' + ccFmtNum(rate, to);

    // Quick convert table
    const multiples = [1, 10, 100, 1000, 10000];
    const quickRows = document.getElementById('quickRows');
    quickRows.innerHTML = multiples.map(m => {
        const val = ccConvertAmount(m, from, to);
        return `<div class="cc-quick-row"><span>${m.toLocaleString()} ${from}</span><span>${ccFmtNum(val, to)}</span></div>`;
    }).join('');
    document.getElementById('ccQuickConvert').style.display = '';
}

document.addEventListener('DOMContentLoaded', convert);
</script>
