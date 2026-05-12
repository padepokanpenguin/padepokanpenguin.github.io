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
        <p>Hitung PPh Pasal 21 dengan PTKP dan tarif progresif</p>
    </header>

    <div class="calculator-container">
        <div class="calculator-inputs">
            <h3>Input</h3>

            <div class="input-group">
                <label>Penghasilan Bruto per Bulan (Rp)</label>
                <input type="text" id="grossIncome" placeholder="cth: 15.000.000" oninput="formatNum(this)">
            </div>

            <div class="input-group">
                <label>Status PTKP</label>
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
                <label>Biaya Jabatan (Rp/tahun)</label>
                <input type="text" id="biayaJabatan" value="6.000.000" oninput="formatNum(this)">
            </div>

            <button class="calc-btn" onclick="calculateTax()">Hitung Pajak</button>
        </div>

        <div class="calculator-results">
            <h3>Hasil</h3>

            <div class="result-section" id="resultSection" style="display:none;">
                <div class="result-row"><span>Penghasilan Bruto Tahunan</span><span id="resBruto"></span></div>
                <div class="result-row"><span>Biaya Jabatan</span><span id="resBiayaJabatan"></span></div>
                <div class="result-row"><span>Penghasilan Neto</span><span id="resNeto"></span></div>
                <div class="result-row"><span>PTKP</span><span id="resPTKP"></span></div>
                <div class="result-row"><span>PKP</span><span id="resPKP"></span></div>
                <div class="result-row highlight"><span>Pajak per Tahun</span><span id="resPajakTahun"></span></div>
                <div class="result-row highlight"><span>Pajak per Bulan</span><span id="resPajakBulan"></span></div>
                <div class="result-row"><span>Take Home Pay</span><span id="resTakeHome"></span></div>
                <div class="result-row"><span>Eff. Tax Rate</span><span id="resEffRate"></span></div>
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
.info-box { background: #e7f3ff; border-left: 4px solid #2196f3; padding: 12px 16px; border-radius: 0 8px 8px 0; margin-top: 16px; font-size: 0.85rem; line-height: 1.8; }
.result-section .result-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--border); font-size: 0.9rem; }
.result-section .result-row span:first-child { color: var(--secondary); }
.result-section .result-row.highlight span { font-weight: 700; color: var(--accent); }
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

function formatNum(el) {
    let val = el.value.replace(/[^0-9]/g, '');
    if (val) el.value = parseInt(val).toLocaleString('id-ID');
}

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

    if (bruto <= 0) { alert('Masukkan penghasilan yang valid.'); return; }

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
    document.getElementById('resPajakTahun').textContent = formatRupiah(totalTax);
    document.getElementById('resPajakBulan').textContent = formatRupiah(totalTax / 12);
    document.getElementById('resTakeHome').textContent = formatRupiah(takeHome);
    document.getElementById('resEffRate').textContent = effRate + '%';
    document.getElementById('resultSection').style.display = 'block';
}
</script>
