---
title: "Tax Calculator"
date: 2025-10-12T10:00:00+07:00
draft: false
description: "Kalkulator pajak penghasilan Indonesia (PPh Pasal 21) dengan PTKP dan tarif progresif terbaru."
markup: html
---

<div class="calculator-page">
    <header class="calculator-header">
        <h1>🧾 Kalkulator Pajak PPh 21</h1>
        <p>Hitung PPh Pasal 21 dengan PTKP 2024 dan tarif progresif terbaru</p>
    </header>

    <div class="calculator-container">
        <div class="calculator-inputs">
            <h3>Input</h3>

            <div class="input-group">
                <label>Penghasilan Bruto per Bulan (Rp)</label>
                <input type="text" id="grossIncome" placeholder="cth: 15.000.000" oninput="taxFmt(this); calculateTax()">
            </div>

            <div class="input-group">
                <label>Status PTKP</label>
                <select id="ptkpStatus" onchange="calculateTax()">
                    <option value="TK/0">TK/0 — Tidak Kawin, 0 tanggungan</option>
                    <option value="TK/1">TK/1 — Tidak Kawin, 1 tanggungan</option>
                    <option value="TK/2">TK/2 — Tidak Kawin, 2 tanggungan</option>
                    <option value="TK/3">TK/3 — Tidak Kawin, 3 tanggungan</option>
                    <option value="K/0">K/0 — Kawin, 0 tanggungan</option>
                    <option value="K/1">K/1 — Kawin, 1 tanggungan</option>
                    <option value="K/2">K/2 — Kawin, 2 tanggungan</option>
                    <option value="K/3">K/3 — Kawin, 3 tanggungan</option>
                </select>
            </div>

            <div class="input-group">
                <label>Biaya Jabatan (otomatis, maks Rp 6jt/tahun)</label>
                <input type="text" id="biayaJabatan" readonly>
            </div>

            <div class="info-box">
                <strong>📋 Tarif Progresif PPh 21</strong><br>
                ≤ Rp 60jt &nbsp;&nbsp;&nbsp;→ <strong>5%</strong><br>
                Rp 60–250jt &nbsp;→ <strong>15%</strong><br>
                Rp 250–500jt → <strong>25%</strong><br>
                Rp 500jt–5M → <strong>30%</strong><br>
                > Rp 5M &nbsp;&nbsp;&nbsp;&nbsp;→ <strong>35%</strong>
            </div>
        </div>

        <div class="calculator-results">
            <h3>Hasil</h3>

            <div id="taxPlaceholder" class="calc-placeholder">
                <span class="ph-icon">🧾</span>
                Masukkan gaji bulanan untuk melihat perhitungan pajak
            </div>

            <div id="taxResultSection" style="display:none;">
                <div class="tax-summary-grid">
                    <div class="tax-summary-item">
                        <span class="tax-s-label">Pajak / Tahun</span>
                        <span class="tax-s-value" id="resPajakTahun">—</span>
                    </div>
                    <div class="tax-summary-item tax-summary-main">
                        <span class="tax-s-label">Pajak / Bulan</span>
                        <span class="tax-s-value" id="resPajakBulan">—</span>
                    </div>
                    <div class="tax-summary-item">
                        <span class="tax-s-label">Eff. Rate</span>
                        <span class="tax-s-value" id="resEffRate">—</span>
                    </div>
                </div>

                <div class="result-row"><span>Bruto Tahunan</span><span id="resBruto">—</span></div>
                <div class="result-row"><span>Biaya Jabatan</span><span id="resBiayaJabatan">—</span></div>
                <div class="result-row"><span>Penghasilan Neto</span><span id="resNeto">—</span></div>
                <div class="result-row"><span>PTKP</span><span id="resPTKP">—</span></div>
                <div class="result-row"><span>PKP (Kena Pajak)</span><span id="resPKP">—</span></div>
                <div class="result-row highlight"><span>Take Home / Bulan</span><span id="resTakeHome">—</span></div>

                <div class="tax-bracket-bar" id="taxBracketBar"></div>
            </div>
        </div>
    </div>
</div>

<style>
.tax-summary-grid { display: grid; grid-template-columns: 1fr 1.2fr 1fr; gap: 8px; margin-bottom: 1.25rem; }
.tax-summary-item { background: var(--theme); border: 1px solid var(--border); border-radius: 10px; padding: 12px 8px; text-align: center; }
.tax-summary-main { background: linear-gradient(135deg, #e74c3c, #c0392b); border-color: transparent; }
.tax-s-label { display: block; font-size: 0.68rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--secondary); margin-bottom: 4px; }
.tax-summary-main .tax-s-label { color: rgba(255,255,255,0.8); }
.tax-s-value { display: block; font-size: 0.88rem; font-weight: 700; color: var(--primary); }
.tax-summary-main .tax-s-value { color: #fff; font-size: 0.95rem; }
.tax-bracket-bar { margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border); }
.tb-title { font-size: 0.72rem; font-weight: 600; color: var(--secondary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
.tb-row { display: flex; align-items: center; gap: 8px; margin-bottom: 7px; }
.tb-label { min-width: 36px; color: var(--secondary); font-size: 0.72rem; font-weight: 600; }
.tb-track { flex: 1; height: 8px; background: var(--border); border-radius: 4px; overflow: hidden; }
.tb-fill { height: 100%; border-radius: 4px; transition: width 0.6s ease; }
.tb-amount { min-width: 90px; text-align: right; font-weight: 600; color: var(--primary); font-size: 0.75rem; }
</style>

<script>
const TAX_PTKP = {
    'TK/0': 54000000, 'TK/1': 58500000, 'TK/2': 63000000, 'TK/3': 67500000,
    'K/0': 58500000, 'K/1': 63000000, 'K/2': 67500000, 'K/3': 72000000
};
const TAX_BRACKETS = [
    { label: '5%',  min: 0,          max: 60000000,    rate: 0.05, color: '#27ae60' },
    { label: '15%', min: 60000000,   max: 250000000,   rate: 0.15, color: '#f39c12' },
    { label: '25%', min: 250000000,  max: 500000000,   rate: 0.25, color: '#e67e22' },
    { label: '30%', min: 500000000,  max: 5000000000,  rate: 0.30, color: '#e74c3c' },
    { label: '35%', min: 5000000000, max: Infinity,    rate: 0.35, color: '#8e44ad' }
];
function taxFmt(el) {
    const raw = el.value.replace(/[^0-9]/g, '');
    el.value = raw ? parseInt(raw).toLocaleString('id-ID') : '';
}
function taxParse(str) {
    return parseInt((str || '0').replace(/[^0-9]/g, '')) || 0;
}
function taxFmtRp(n) {
    return 'Rp\u00a0' + Math.round(n).toLocaleString('id-ID');
}
function calculateTax() {
    const bruto = taxParse(document.getElementById('grossIncome').value);
    const biayaJabatanAuto = Math.min(bruto * 12 * 0.05, 6000000);
    document.getElementById('biayaJabatan').value = biayaJabatanAuto > 0 ? biayaJabatanAuto.toLocaleString('id-ID') : '';
    const placeholder = document.getElementById('taxPlaceholder');
    const resultSection = document.getElementById('taxResultSection');
    if (bruto <= 0) { placeholder.style.display = ''; resultSection.style.display = 'none'; return; }

    const ptkpStatus = document.getElementById('ptkpStatus').value;
    const ptkpVal = TAX_PTKP[ptkpStatus];
    const brutoTahunan = bruto * 12;
    const netoTahunan = Math.max(0, brutoTahunan - biayaJabatanAuto);
    const pkp = Math.max(0, netoTahunan - ptkpVal);

    let totalTax = 0, remaining = pkp, prevMax = 0;
    const bracketTax = [];
    for (const b of TAX_BRACKETS) {
        const rangeSize = b.max === Infinity ? remaining : b.max - prevMax;
        const taxable = Math.min(remaining, rangeSize);
        const tax = taxable * b.rate;
        bracketTax.push({ ...b, taxable, tax });
        totalTax += tax;
        remaining -= taxable;
        prevMax = b.max;
        if (remaining <= 0) break;
    }
    const takeHome = bruto - (totalTax / 12);
    const effRate = brutoTahunan > 0 ? ((totalTax / brutoTahunan) * 100).toFixed(2) : '0.00';

    document.getElementById('resBruto').textContent = taxFmtRp(brutoTahunan);
    document.getElementById('resBiayaJabatan').textContent = taxFmtRp(biayaJabatanAuto);
    document.getElementById('resNeto').textContent = taxFmtRp(netoTahunan);
    document.getElementById('resPTKP').textContent = taxFmtRp(ptkpVal);
    document.getElementById('resPKP').textContent = pkp > 0 ? taxFmtRp(pkp) : 'Rp\u00a00 (di bawah PTKP)';
    document.getElementById('resPajakTahun').textContent = taxFmtRp(totalTax);
    document.getElementById('resPajakBulan').textContent = taxFmtRp(totalTax / 12);
    document.getElementById('resTakeHome').textContent = taxFmtRp(takeHome);
    document.getElementById('resEffRate').textContent = effRate + '%';

    const barEl = document.getElementById('taxBracketBar');
    if (totalTax > 0) {
        let html = '<div class="tb-title">Rincian per Tarif</div>';
        for (const b of bracketTax) {
            if (b.taxable <= 0) continue;
            const pct = Math.min(100, (b.taxable / pkp) * 100).toFixed(1);
            html += `<div class="tb-row"><span class="tb-label">${b.label}</span><div class="tb-track"><div class="tb-fill" style="width:${pct}%;background:${b.color};"></div></div><span class="tb-amount">${taxFmtRp(b.tax)}</span></div>`;
        }
        barEl.innerHTML = html;
        barEl.style.display = '';
    } else {
        barEl.style.display = 'none';
    }
    placeholder.style.display = 'none';
    resultSection.style.display = '';
}
</script>
