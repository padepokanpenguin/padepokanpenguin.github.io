---
title: "Inflation Calculator"
date: 2025-10-12T10:00:00+07:00
draft: false
description: "Kalkulator inflasi Indonesia — hitung dampak inflasi terhadap daya beli dan tabungan Anda."
markup: html
---

<div class="calculator-page">
    <header class="calculator-header">
        <h1>📉 Inflation Calculator</h1>
        <p>Simulasikan dampak inflasi terhadap daya beli dan tabungan Anda dari waktu ke waktu</p>
    </header>

    <div class="calculator-container">
        <div class="calculator-inputs">
            <h3>Input</h3>

            <div class="input-group">
                <label for="initialAmount">Jumlah Awal (Rp)</label>
                <input type="number" id="initialAmount" placeholder="10000000" min="0" step="1000000">
            </div>

            <div class="input-group">
                <label for="inflationRate">Tingkat Inflasi per Tahun (%)</label>
                <input type="number" id="inflationRate" value="4" min="0.1" max="30" step="0.1">
                <span class="hint">Default: 4% (rata-rata inflasi Indonesia)</span>
            </div>

            <div class="input-group">
                <label for="yearsToSimulate">Jangka Waktu (Tahun)</label>
                <input type="number" id="yearsToSimulate" value="10" min="1" max="50" step="1">
            </div>

            <div class="input-group">
                <label for="compoundingType">Jenis Perhitungan</label>
                <select id="compoundingType">
                    <option value="annual">Tahunan (compounded yearly)</option>
                    <option value="monthly">Bulanan (compounded monthly)</option>
                    <option value="simple">Simple (tidak compounded)</option>
                </select>
            </div>

            <button id="calculate-inflation" class="calc-button">Hitung Dampak Inflasi</button>
        </div>

        <div class="calculator-results">
            <h3>Results</h3>

            <div id="resultSection" style="display:none;">
                <!-- Hero result -->
                <div class="result-hero">
                    <div class="hero-item">
                        <span class="hero-label">💸 Nilai Sekarang</span>
                        <span class="hero-value" id="resPresent">-</span>
                    </div>
                    <div class="hero-arrow">→</div>
                    <div class="hero-item">
                        <span class="hero-label">🪙 Nilai di Masa Depan</span>
                        <span class="hero-value future" id="resFuture">-</span>
                    </div>
                </div>

                <div class="result-item highlight">
                    <span class="result-label">💰 Daya Beli Terdegradasi</span>
                    <span class="result-value" id="resLoss">-</span>
                </div>
                <div class="result-item">
                    <span class="result-label">📉 Tingkat Degradasi</span>
                    <span class="result-value" id="resDegradation">-</span>
                </div>
                <div class="result-item">
                    <span class="result-label">🏦 Sebesar Apa Tabungan Anda Sekarang</span>
                    <span class="result-value" id="resEquivalent">-</span>
                </div>

                <!-- Year-by-year table -->
                <div class="inflation-table-wrap">
                    <h4>📊 Tabel Inflasi per Tahun</h4>
                    <table class="inflation-table" id="inflationTable">
                        <thead>
                            <tr>
                                <th>Tahun</th>
                                <th>Nilai Nominal</th>
                                <th>Daya Beli</th>
                                <th>Degradasi</th>
                            </tr>
                        </thead>
                        <tbody id="inflationTableBody"></tbody>
                    </table>
                </div>

                <!-- Insights -->
                <div class="insight-box">
                    <strong>💡 Insight</strong>
                    <p id="inflationInsight">-</p>
                </div>
            </div>

            <div id="emptyState" class="empty-state">
                <p>Masukkan jumlah dan tingkat inflasi untuk melihat dampaknya terhadap daya beli.</p>
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
    .calculator-container { grid-template-columns: 1fr; }
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
    .input-group .hint { font-size: 0.75rem; }
    .calc-button { padding: 12px; font-size: 0.95rem; }
}

.calculator-inputs {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 12px;
}

.calculator-inputs h3 { margin-bottom: 20px; color: #333; }

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
    box-sizing: border-box;
}

.input-group input:focus,
.input-group select:focus {
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

.calc-button:hover { background: #357abd; }

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

.result-hero {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #f8f9fa;
    border-radius: 10px;
    padding: 16px;
    margin-bottom: 16px;
}

.hero-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: center;
}

.hero-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #888;
    margin-bottom: 4px;
}

.hero-value {
    font-size: 1rem;
    font-weight: 800;
    color: #333;
}

.hero-value.future {
    color: #dc3545;
}

.hero-arrow {
    font-size: 1.2rem;
    color: #ccc;
}

.result-item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #eee;
    font-size: 0.9rem;
}

.result-item:last-of-type { border-bottom: none; }

.result-item.highlight {
    background: #fff3f3;
    margin: 10px -15px -10px;
    padding: 12px 15px;
    border-radius: 0 0 10px 10px;
    border-bottom: none;
}

.result-item.highlight .result-value { color: #dc3545; font-size: 1.1rem; }

.result-label { color: #666; }
.result-value { font-weight: 700; color: #333; }

.inflation-table-wrap {
    margin-top: 20px;
    overflow-x: auto;
}

.inflation-table-wrap h4 {
    font-size: 0.95rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 12px;
}

.inflation-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85rem;
}

.inflation-table th {
    background: #f0f0f0;
    padding: 8px 10px;
    text-align: left;
    font-weight: 700;
    color: #555;
    border-bottom: 2px solid #ddd;
}

.inflation-table td {
    padding: 8px 10px;
    border-bottom: 1px solid #f0f0f0;
    color: #333;
}

.inflation-table tr:nth-child(even) td { background: #fafafa; }
.inflation-table tr:last-child td { border-bottom: none; }
.inflation-table td:nth-child(2),
.inflation-table td:nth-child(3) { font-weight: 600; }
.inflation-table td:nth-child(4) { color: #dc3545; }

.insight-box {
    background: #fff8e1;
    border-left: 4px solid #ffc107;
    padding: 14px 16px;
    border-radius: 0 8px 8px 0;
    margin-top: 16px;
    font-size: 0.85rem;
    line-height: 1.6;
    color: #555;
}

.insight-box strong { display: block; margin-bottom: 4px; color: #333; }
</style>

<script>
function formatRupiah(num) {
    return 'Rp ' + Math.round(num).toLocaleString('id-ID');
}

function formatRupiahShort(num) {
    if (num >= 1e12) return 'Rp ' + (num / 1e12).toFixed(1) + 'T';
    if (num >= 1e9) return 'Rp ' + (num / 1e9).toFixed(1) + 'M';
    if (num >= 1e6) return 'Rp ' + (num / 1e6).toFixed(1) + 'Jt';
    return formatRupiah(num);
}

function calculateInflation() {
    const initial = parseFloat(document.getElementById('initialAmount').value) || 0;
    const inflationRate = (parseFloat(document.getElementById('inflationRate').value) || 4) / 100;
    const years = parseInt(document.getElementById('yearsToSimulate').value) || 10;
    const compounding = document.getElementById('compoundingType').value;

    if (initial <= 0) {
        alert('Masukkan jumlah yang valid.');
        return;
    }

    const tableBody = document.getElementById('inflationTableBody');
    tableBody.innerHTML = '';

    let futureValue, degradationPct, power;

    if (compounding === 'monthly') {
        power = 12 * years;
        futureValue = initial * Math.pow(1 + inflationRate / 12, power);
    } else if (compounding === 'annual') {
        power = years;
        futureValue = initial * Math.pow(1 + inflationRate, power);
    } else {
        power = years;
        futureValue = initial * (1 + inflationRate * power);
    }

    const loss = futureValue - initial;
    degradationPct = ((futureValue - initial) / initial) * 100;
    const presentValue = initial; // what it was worth then
    const equivalentNow = initial / (1 + inflationRate); // what would need to be saved then

    document.getElementById('resPresent').textContent = formatRupiahShort(initial);
    document.getElementById('resFuture').textContent = formatRupiahShort(futureValue);
    document.getElementById('resLoss').textContent = formatRupiahShort(loss);
    document.getElementById('resDegradation').textContent = degradationPct.toFixed(1) + '%';
    document.getElementById('resEquivalent').textContent = formatRupiahShort(equivalentNow) + ' (jika diinvestasikan)';

    // Build year-by-year table
    for (let y = 1; y <= years; y++) {
        let fv;
        if (compounding === 'monthly') {
            fv = initial * Math.pow(1 + inflationRate / 12, 12 * y);
        } else if (compounding === 'annual') {
            fv = initial * Math.pow(1 + inflationRate, y);
        } else {
            fv = initial * (1 + inflationRate * y);
        }

        const buyingPower = (initial / fv) * 100;
        const deg = ((fv - initial) / initial) * 100;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>Tahun ${y}</td>
            <td>${formatRupiahShort(fv)}</td>
            <td>${buyingPower.toFixed(1)}%</td>
            <td>+${deg.toFixed(1)}%</td>
        `;
        tableBody.appendChild(row);
    }

    // Insight
    const yearsToHalf = Math.log(0.5) / Math.log(1 + inflationRate);
    const insight = yearsToHalf < 20
        ? `Dengan inflasi ${(inflationRate * 100).toFixed(1)}% per tahun, daya beli uang Anda akan menyusut menjadi setengahnya dalam <strong>${yearsToHalf.toFixed(1)} tahun</strong>. Tabungan Rp ${formatRupiahShort(initial)} hari ini hanya bernilai Rp ${formatRupiahShort(initial / 2)} dalam ${Math.round(yearsToHalf)} tahun. Investasikan di instrumen yang return-nya > ${(inflationRate * 100).toFixed(1)}% untuk mempertahankan nilai riil.`
        : `Dengan inflasi ${(inflationRate * 100).toFixed(1)}%, dampak degradasi relatif lambat. Dalam ${years} tahun, uang Anda akan terdegradasi ${degradationPct.toFixed(1)}% — namun tetap pertimbangkan investasi untuk pertumbuhan jangka panjang.`;

    document.getElementById('inflationInsight').innerHTML = insight;

    document.getElementById('resultSection').style.display = 'block';
    document.getElementById('emptyState').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculate-inflation').addEventListener('click', calculateInflation);
});
</script>
