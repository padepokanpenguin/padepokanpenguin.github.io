---
title: "Budget Planner"
date: 2025-10-12T10:00:00+07:00
draft: false
description: "Monthly budget planner — atur anggaran bulanan dengan metode 50/30/20 dan kategori pengeluaran."
markup: html
---

<div class="calculator-page">
    <header class="calculator-header">
        <h1>💸 Budget Planner</h1>
        <p>Rencana anggaran bulanan — atur pengeluaran dengan metode 50/30/20 dan kategori-kategori utama</p>
    </header>

    <div class="calculator-container">
        <div class="calculator-inputs">
            <h3>Input</h3>

            <div class="input-group">
                <label for="monthlyIncome">Penghasilan Bersih per Bulan (Rp)</label>
                <input type="number" id="monthlyIncome" placeholder="15000000" min="0" step="500000">
            </div>

            <div class="input-group">
                <label for="budgetMethod">Metode Anggaran</label>
                <select id="budgetMethod">
                    <option value="503020">50/30/20 — Needs / Wants / Savings</option>
                    <option value="406020">40/60/0 — Prioritas kewajiban & kebutuhan</option>
                    <option value="501525">50/15/25 —紧凑 — Hobi, perjalanan, investasi agresif</option>
                    <option value="custom">Custom (atur sendiri)</option>
                </select>
            </div>

            <div id="customSliders" class="custom-sliders" style="display:none;">
                <div class="input-group">
                    <label for="customNeeds">Kebutuhan (%) <span id="needsPct">50%</span></label>
                    <input type="range" id="customNeeds" min="0" max="100" value="50">
                </div>
                <div class="input-group">
                    <label for="customWants">Keinginan (%) <span id="wantsPct">30%</span></label>
                    <input type="range" id="customWants" min="0" max="100" value="30">
                </div>
                <div class="input-group">
                    <label for="customSavings">Tabungan (%) <span id="savingsPct">20%</span></label>
                    <input type="range" id="customSavings" min="0" max="100" value="20">
                </div>
                <div id="percentWarning" class="error-msg" style="display:none;">Total harus 100%!</div>
            </div>

            <button id="calculate-budget" class="calc-button">Hitung Rencana</button>
        </div>

        <div class="calculator-results">
            <h3>Results</h3>

            <div id="budgetResults" style="display:none;">
                <!-- Summary cards -->
                <div class="budget-summary">
                    <div class="budget-card needs">
                        <span class="budget-card-icon">🏠</span>
                        <span class="budget-card-label">Kebutuhan</span>
                        <span class="budget-card-amount" id="needsAmount">-</span>
                        <span class="budget-card-pct" id="needsPctRes">50%</span>
                    </div>
                    <div class="budget-card wants">
                        <span class="budget-card-icon">🎯</span>
                        <span class="budget-card-label">Keinginan</span>
                        <span class="budget-card-amount" id="wantsAmount">-</span>
                        <span class="budget-card-pct" id="wantsPctRes">30%</span>
                    </div>
                    <div class="budget-card savings">
                        <span class="budget-card-icon">🏦</span>
                        <span class="budget-card-label">Tabungan</span>
                        <span class="budget-card-amount" id="savingsAmount">-</span>
                        <span class="budget-card-pct" id="savingsPctRes">20%</span>
                    </div>
                </div>

                <!-- Breakdown table -->
                <div class="breakdown-section">
                    <h4>📋 Rincian per Kategori</h4>
                    <div id="breakdownTable"></div>
                </div>

                <!-- Tips -->
                <div class="tips-box">
                    <strong>💡 Tips Pengelolaan Anggaran</strong>
                    <ul id="budgetTips">
                        <li>Lunasi tagihan kartu kredit lebih dulu — bunga majemuk sangat mahal.</li>
                        <li>Tabungan darurat idealnya 3–6 bulan pengeluaran.</li>
                        <li>Gunakan aplikasi banking untuk pantau pengeluaran harian.</li>
                    </ul>
                </div>
            </div>

            <div id="emptyState" class="empty-state">
                <p>Masukkan penghasilan dan pilih metode untuk melihat rencana anggaran.</p>
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
    .calculator-header h1 { font-size: 1.5rem; }
    .calculator-header p { font-size: 0.9rem; }
    .calculator-inputs, .calculator-results { padding: 20px; }
}

@media (max-width: 480px) {
    .calculator-page { padding: 15px; }
    .calculator-header h1 { font-size: 1.3rem; }
    .input-group { margin-bottom: 15px; }
    .input-group label { font-size: 0.9rem; }
    .input-group input, .input-group select {
        padding: 10px 12px; font-size: 0.95rem;
    }
    .calc-button { padding: 12px; font-size: 0.95rem; }
}

.calculator-inputs {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 12px;
}

.calculator-inputs h3, .calculator-results h3 {
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

.input-group input[type="number"],
.input-group select {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s;
    background: #fff;
    box-sizing: border-box;
}

.input-group input[type="number"]:focus,
.input-group select:focus {
    outline: none;
    border-color: #4a90e2;
}

.input-group input[type="range"] {
    width: 100%;
    margin-top: 8px;
    accent-color: #4a90e2;
}

.input-group span {
    font-weight: 600;
    color: #4a90e2;
    float: right;
}

.custom-sliders {
    background: #fff;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 20px;
    border: 1px solid #e0e0e0;
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

.calc-button:hover { background: #357abd; }

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

.calculator-results h3 { margin-bottom: 20px; color: #333; }

.empty-state {
    text-align: center;
    padding: 30px 20px;
    color: #999;
    font-size: 0.9rem;
}

.budget-summary {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 24px;
}

.budget-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 10px;
    border-radius: 10px;
    text-align: center;
}

.budget-card.needs { background: #fff3e0; }
.budget-card.wants { background: #e3f2fd; }
.budget-card.savings { background: #e8f5e9; }

.budget-card-icon { font-size: 1.5rem; margin-bottom: 4px; }
.budget-card-label { font-size: 0.75rem; font-weight: 600; color: #666; margin-bottom: 4px; }
.budget-card-amount { font-size: 1rem; font-weight: 800; color: #333; }
.budget-card-pct { font-size: 0.7rem; color: #888; margin-top: 2px; }

.breakdown-section h4 {
    font-size: 0.95rem;
    font-weight: 700;
    color: #333;
    margin: 0 0 12px 0;
    padding-bottom: 8px;
    border-bottom: 2px solid #eee;
}

.breakdown-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
    font-size: 0.875rem;
}

.breakdown-row:last-child { border-bottom: none; }
.breakdown-row .cat { color: #555; }
.breakdown-row .amt { font-weight: 700; color: #333; }
.breakdown-row .pct { color: #888; font-size: 0.8rem; }

.tips-box {
    background: #fff8e1;
    border-left: 4px solid #ffc107;
    padding: 14px 16px;
    border-radius: 0 8px 8px 0;
    margin-top: 20px;
    font-size: 0.85rem;
    line-height: 1.7;
}

.tips-box strong { display: block; margin-bottom: 6px; color: #333; }
.tips-box ul { margin: 0; padding-left: 18px; color: #555; }
.tips-box ul li { margin-bottom: 4px; }

@media (max-width: 480px) {
    .budget-summary { grid-template-columns: 1fr; }
    .budget-card { flex-direction: row; justify-content: space-between; }
    .budget-card-amount { font-size: 1.1rem; }
}
</style>

<script>
const NEEDS_CATEGORIES = [
    { name: '🏠 Sewa / KPR', pct: 25 },
    { name: '⚡ Listrik & Air', pct: 3 },
    { name: '🍳 Makanan & Minuman', pct: 12 },
    { name: '🏥 Asuransi & Kesehatan', pct: 5 },
    { name: '🚗 Transportasi', pct: 5 }
];

const WANTS_CATEGORIES = [
    { name: '🎬 Hiburan & Streaming', pct: 5 },
    { name: '🛍️ Belanja Non-Esensial', pct: 7 },
    { name: '☕ Makan di Luar / Cafe', pct: 8 },
    { name: '✈️ Liburan & Travelling', pct: 5 },
    { name: '🎮 Hobi & Subscription', pct: 5 }
];

document.addEventListener('DOMContentLoaded', function() {
    const calcBtn = document.getElementById('calculate-budget');
    calcBtn.addEventListener('click', calculateBudget);

    const methodSelect = document.getElementById('budgetMethod');
    methodSelect.addEventListener('change', function() {
        const custom = document.getElementById('customSliders');
        custom.style.display = this.value === 'custom' ? 'block' : 'none';
    });

    // Live update custom sliders
    ['customNeeds', 'customWants', 'customSavings'].forEach(id => {
        document.getElementById(id).addEventListener('input', function() {
            const needs = parseInt(document.getElementById('customNeeds').value);
            const wants = parseInt(document.getElementById('customWants').value);
            const savings = parseInt(document.getElementById('customSavings').value);
            document.getElementById('needsPct').textContent = needs + '%';
            document.getElementById('wantsPct').textContent = wants + '%';
            document.getElementById('savingsPct').textContent = savings + '%';
            const warning = document.getElementById('percentWarning');
            warning.style.display = (needs + wants + savings !== 100) ? 'block' : 'none';
        });
    });
});

function calculateBudget() {
    const income = parseFloat(document.getElementById('monthlyIncome').value) || 0;
    if (income <= 0) {
        alert('Masukkan penghasilan yang valid.');
        return;
    }

    const method = document.getElementById('budgetMethod').value;
    let needsPct, wantsPct, savingsPct;

    if (method === 'custom') {
        needsPct = parseInt(document.getElementById('customNeeds').value);
        wantsPct = parseInt(document.getElementById('customWants').value);
        savingsPct = parseInt(document.getElementById('customSavings').value);
        if (needsPct + wantsPct + savingsPct !== 100) {
            alert('Total persentase harus 100%!');
            return;
        }
    } else if (method === '503020') {
        [needsPct, wantsPct, savingsPct] = [50, 30, 20];
    } else if (method === '406020') {
        [needsPct, wantsPct, savingsPct] = [40, 60, 0];
    } else {
        [needsPct, wantsPct, savingsPct] = [50, 15, 25];
    }

    const needsAmt = income * needsPct / 100;
    const wantsAmt = income * wantsPct / 100;
    const savingsAmt = income * savingsPct / 100;

    document.getElementById('needsAmount').textContent = formatRupiah(needsAmt);
    document.getElementById('wantsAmount').textContent = formatRupiah(wantsAmt);
    document.getElementById('savingsAmount').textContent = formatRupiah(savingsAmt);
    document.getElementById('needsPctRes').textContent = needsPct + '%';
    document.getElementById('wantsPctRes').textContent = wantsPct + '%';
    document.getElementById('savingsPctRes').textContent = savingsPct + '%';

    // Build breakdown table
    const table = document.getElementById('breakdownTable');

    let html = '<div style="font-weight:700;color:#666;font-size:0.8rem;margin-bottom:8px;">Kebutuhan (' + needsPct + '%)</div>';
    NEEDS_CATEGORIES.forEach(cat => {
        const amt = needsAmt * cat.pct / 100;
        html += '<div class="breakdown-row"><span class="cat">' + cat.name + '</span><span><span class="amt">' + formatRupiah(amt) + '</span> <span class="pct">' + cat.pct + '%</span></span></div>';
    });

    html += '<div style="font-weight:700;color:#666;font-size:0.8rem;margin:12px 0 8px;">Keinginan (' + wantsPct + '%)</div>';
    WANTS_CATEGORIES.forEach(cat => {
        const amt = wantsAmt * cat.pct / 100;
        html += '<div class="breakdown-row"><span class="cat">' + cat.name + '</span><span><span class="amt">' + formatRupiah(amt) + '</span> <span class="pct">' + cat.pct + '%</span></span></div>';
    });

    if (savingsAmt > 0) {
        html += '<div style="font-weight:700;color:#666;font-size:0.8rem;margin:12px 0 8px;">Tabungan & Investasi (' + savingsPct + '%)</div>';
        html += '<div class="breakdown-row"><span class="cat">🏦 Tabungan Darurat</span><span><span class="amt">' + formatRupiah(savingsAmt * 0.4) + '</span> <span class="pct">40%</span></span></div>';
        html += '<div class="breakdown-row"><span class="cat">📈 Investasi Rutin</span><span><span class="amt">' + formatRupiah(savingsAmt * 0.4) + '</span> <span class="pct">40%</span></span></div>';
        html += '<div class="breakdown-row"><span class="cat">🎯 Dana Utama</span><span><span class="amt">' + formatRupiah(savingsAmt * 0.2) + '</span> <span class="pct">20%</span></span></div>';
    }

    table.innerHTML = html;

    document.getElementById('budgetResults').style.display = 'block';
    document.getElementById('emptyState').style.display = 'none';
}

function formatRupiah(num) {
    return 'Rp ' + Math.round(num).toLocaleString('id-ID');
}
</script>
