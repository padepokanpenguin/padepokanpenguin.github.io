---
title: "Tax Calculator"
date: 2025-10-12T10:00:00+07:00
draft: false
description: "Kalkulator pajak penghasilan Indonesia (PPh Pasal 21) dengan PTKP dan tarif progresif terbaru."
markup: html
---

<div class="calculator-page">
    <header class="calculator-header">
        <h1>🧾 Kalkulator Pajak Indonesia</h1>
        <p>Hitung PPh Pasal 21 dengan PTKP dan tarif progresif terbaru</p>
    </header>

    <div class="calculator-container">
        <div class="calculator-inputs">
            <h3>Input</h3>

            <div class="input-group">
                <label for="grossIncome">Penghasilan Bruto per Bulan (Rp)</label>
                <input type="number" id="grossIncome" placeholder="15000000" min="0" step="500000">
            </div>

            <div class="input-group">
                <label for="ptkpStatus">Status PTKP</label>
                <select id="ptkpStatus">
                    <option value="TK/0">TK/0 - Tidak Kawin, tanpa tanggungan</option>
                    <option value="TK/1">TK/1 - Tidak Kawin, 1 tanggungan</option>
                    <option value="TK/2">TK/2 - Tidak Kawin, 2 tanggungan</option>
                    <option value="TK/3">TK/3 - Tidak Kawin, 3 tanggungan</option>
                    <option value="K/0">K/0 - Kawin, tanpa tanggungan</option>
                    <option value="K/1">K/1 - Kawin, 1 tanggungan</option>
                    <option value="K/2">K/2 - Kawin, 2 tanggungan</option>
                    <option value="K/3">K/3 - Kawin, 3 tanggungan</option>
                </select>
            </div>

            <div class="input-group">
                <label for="biayaJabatan">Biaya Jabatan (Rp/tahun)</label>
                <input type="number" id="biayaJabatan" value="6000000" min="0" step="500000">
                <span class="hint">Default: Rp 6.000.000 per tahun</span>
            </div>

            <button id="calculate-tax" class="calc-button">Hitung Pajak</button>
        </div>

        <div class="calculator-results">
            <h3>Results</h3>

            <div class="result-item">
                <span class="result-label">Penghasilan Bruto Tahunan</span>
                <span class="result-value" id="resBruto">Rp 0</span>
            </div>
            <div class="result-item">
                <span class="result-label">Biaya Jabatan</span>
                <span class="result-value" id="resBiayaJabatan">Rp 0</span>
            </div>
            <div class="result-item">
                <span class="result-label">Penghasilan Neto</span>
                <span class="result-value" id="resNeto">Rp 0</span>
            </div>
            <div class="result-item">
                <span class="result-label">PTKP</span>
                <span class="result-value" id="resPTKP">Rp 0</span>
            </div>
            <div class="result-item">
                <span class="result-label">PKP</span>
                <span class="result-value" id="resPKP">Rp 0</span>
            </div>
            <div class="result-item">
                <span class="result-label">Take Home Pay / Bulan</span>
                <span class="result-value" id="resTakeHome">Rp 0</span>
            </div>
            <div class="result-item">
                <span class="result-label">Effective Tax Rate</span>
                <span class="result-value" id="resEffRate">0%</span>
            </div>
            <div class="result-item highlight">
                <span class="result-label">Pajak per Tahun</span>
                <span class="result-value" id="resPajakTahun">Rp 0</span>
            </div>
            <div class="result-item highlight">
                <span class="result-label">Pajak per Bulan</span>
                <span class="result-value" id="resPajakBulan">Rp 0</span>
            </div>

            <div class="info-box">
                <strong>📋 Tarif Progresif PPh Pasal 21</strong><br>
                ≤ Rp 60jt: <strong>5%</strong><br>
                Rp 60-250jt: <strong>15%</strong><br>
                Rp 250-500jt: <strong>25%</strong><br>
                Rp 500jt-5M: <strong>30%</strong><br>
                > Rp 5M: <strong>35%</strong>
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

.info-box {
    background: #e7f3ff;
    border-left: 4px solid #2196f3;
    padding: 12px 16px;
    border-radius: 0 8px 8px 0;
    margin-top: 16px;
    font-size: 0.85rem;
    line-height: 1.8;
    color: #333;
}
</style>

<script>
const PTKP = {
    'TK/0': 54000000, 'TK/1': 58500000, 'TK/2': 63000000, 'TK/3': 67500000,
    'K/0': 58500000, 'K/1': 63000000, 'K/2': 67500000, 'K/3': 72000000
};

const TAX_BRACKETS = [
    { min: 0, max: 60000000, rate: 0.05 },
    { min: 60000000, max: 250000000, rate: 0.15 },
    { min: 250000000, max: 500000000, rate: 0.25 },
    { min: 500000000, max: 5000000000, rate: 0.30 },
    { min: 5000000000, max: Infinity, rate: 0.35 }
];

function parseNum(str) {
    return parseInt((str || '0').toString().replace(/[^0-9]/g, '')) || 0;
}

function formatRupiah(num) {
    return 'Rp ' + Math.round(num).toLocaleString('id-ID');
}

function calculateTax() {
    const bruto = parseNum(document.getElementById('grossIncome').value);
    const ptkpStatus = document.getElementById('ptkpStatus').value;
    const biayaJabatan = parseNum(document.getElementById('biayaJabatan').value) || 6000000;

    if (bruto <= 0) {
        alert('Masukkan penghasilan yang valid.');
        return;
    }

    const ptkpVal = PTKP[ptkpStatus];
    const brutoTahunan = bruto * 12;
    const netoTahunan = Math.max(0, brutoTahunan - biayaJabatan);
    const pkp = Math.max(0, netoTahunan - ptkpVal);

    let totalTax = 0, remaining = pkp;
    for (const b of TAX_BRACKETS) {
        if (remaining <= 0) break;
        totalTax += Math.min(remaining, b.max - b.min) * b.rate;
        remaining -= Math.min(remaining, b.max - b.min);
    }

    const takeHome = bruto - (totalTax / 12);
    const effRate = pkp > 0 ? ((totalTax / brutoTahunan) * 100).toFixed(2) : '0.00';

    document.getElementById('resBruto').textContent = formatRupiah(brutoTahunan);
    document.getElementById('resBiayaJabatan').textContent = formatRupiah(biayaJabatan);
    document.getElementById('resNeto').textContent = formatRupiah(netoTahunan);
    document.getElementById('resPTKP').textContent = formatRupiah(ptkpVal);
    document.getElementById('resPKP').textContent = pkp > 0 ? formatRupiah(pkp) : 'Rp 0 (di bawah PTKP)';
    document.getElementById('resTakeHome').textContent = formatRupiah(takeHome);
    document.getElementById('resEffRate').textContent = effRate + '%';
    document.getElementById('resPajakTahun').textContent = formatRupiah(totalTax);
    document.getElementById('resPajakBulan').textContent = formatRupiah(totalTax / 12);
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculate-tax').addEventListener('click', calculateTax);
});
</script>
