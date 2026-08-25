---
title: "Apakah Hari Ini Gajian?"
date: 2026-08-25T10:00:00+07:00
draft: false
description: "Satu pertanyaan, satu jawaban. Cek apakah hari ini gajian, lihat hitung mundur ke tanggal gajianmu, dan bagikan ke temanmu yang masih menunggu gajian."
markup: "html"
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Apakah hari ini gajian?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Terjawab langsung di halaman utama: IYA jika hari ini jatuh pada tanggal gajian yang kamu atur, BELUM jika bukan — lengkap dengan hitung mundur ke gajian berikutnya."
      }
    },
    {
      "@type": "Question",
      "name": "Bagaimana cara kerjanya?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pilih tanggal gajianmu sekali, jawaban dihitung dari tanggal di perangkatmu dan tersimpan di browser tanpa server."
      }
    },
    {
      "@type": "Question",
      "name": "Kenapa jawabanku beda dengan temanku?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Karena tanggal gajian kalian berbeda. Setelanmu ikut terbawa lewat tautan (misalnya ?gaji=25), jadi tinggal bagikan."
      }
    }
  ]
}
</script>

<div class="calculator-page ahg-app">
    <main>
        <p class="question">Apakah hari ini gajian?</p>
        <p id="ahg-answer" class="answer" aria-live="polite">&hellip;</p>
        <p id="ahg-status" class="status"></p>

        <section class="countdown" aria-label="Hitung mundur menuju tanggal gajian">
            <p class="cd-label" id="ahg-cd-label">Menuju gajian dalam:</p>
            <div class="cd-grid">
                <div class="cd-cell"><span class="cd-num" id="ahg-cd-d">0</span><span class="cd-unit">hari</span></div>
                <div class="cd-cell"><span class="cd-num" id="ahg-cd-h">00</span><span class="cd-unit">jam</span></div>
                <div class="cd-cell"><span class="cd-num" id="ahg-cd-m">00</span><span class="cd-unit">menit</span></div>
                <div class="cd-cell"><span class="cd-num" id="ahg-cd-s">00</span><span class="cd-unit">detik</span></div>
            </div>
            <div class="progress" id="ahg-progress" role="progressbar" aria-label="Progres perjalanan menuju gajian"
                aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
                <div class="fill" id="ahg-fill"></div>
            </div>
            <p class="prog-text" id="ahg-prog-text">Perjalanan ini sudah ditempuh 0%</p>
        </section>

        <section id="config" aria-label="Pengaturan tanggal gajian">
            <h2>Tanggal gajianmu tiap bulan</h2>
            <div class="chips" id="ahg-chips" role="group" aria-label="Pilih tanggal gajian">
                <button type="button" class="chip" data-cfg="1">1</button>
                <button type="button" class="chip" data-cfg="15">15</button>
                <button type="button" class="chip" data-cfg="25">25</button>
                <button type="button" class="chip" data-cfg="akhir">Akhir bulan</button>
            </div>
            <form class="custom" id="ahg-form">
                <label for="custom-day">Tanggal lain</label>
                <input id="custom-day" type="number" inputmode="numeric" min="1" max="31" step="1"
                    placeholder="mis. 28" autocomplete="off">
                <button type="submit" class="btn btn-primary">Simpan</button>
            </form>
            <p class="hint">Tanggal 29&ndash;31 di bulan yang lebih pendek otomatis dihitung sebagai tanggal terakhir
                bulan itu.</p>
        </section>

        <section id="share" aria-label="Bagikan">
            <h2>Jangan sedih sendirian</h2>
            <div class="share-row">
                <button type="button" class="btn btn-primary" id="ahg-sh-native" style="display:none">Bagikan</button>
                <button type="button" class="btn btn-ghost" id="ahg-sh-wa">WhatsApp</button>
                <button type="button" class="btn btn-ghost" id="ahg-sh-x">X</button>
                <button type="button" class="btn btn-ghost" id="ahg-sh-tg">Telegram</button>
                <button type="button" class="btn btn-ghost" id="ahg-sh-fb">Facebook</button>
                <button type="button" class="btn btn-ghost" id="ahg-sh-copy">Salin tautan</button>
            </div>
            <code class="share-url" id="ahg-share-url"></code>
        </section>

        <!-- SLOT IKLAN 1/2 — ganti isi aside dengan unit Google AdSense. -->
        <aside class="ad-slot" aria-label="Ruang iklan">Slot iklan — tempel kode AdSense di sini</aside>

        <section id="merch" aria-label="Merch">
            <h2>Pamer status finansialmu</h2>
            <div class="merch-grid">
                <article class="card">
                    <div class="card-emoji">👕</div>
                    <h3>Kaos &ldquo;Sabar, Bentar Lagi Gajian&rdquo;</h3>
                    <p><span class="badge">segera</span></p>
                </article>
                <article class="card">
                    <div class="card-emoji">☕</div>
                    <h3>Mug &ldquo;Klub Tanggal 25&rdquo;</h3>
                    <p><span class="badge">segera</span></p>
                </article>
                <article class="card">
                    <div class="card-emoji">💸</div>
                    <h3>Stiker &ldquo;Gajian Datang, Uang Pergi&rdquo;</h3>
                    <p><span class="badge">segera</span></p>
                </article>
            </div>
        </section>

        <!-- SLOT IKLAN 2/2 -->
        <aside class="ad-slot" aria-label="Ruang iklan">Slot iklan — tempel kode AdSense di sini</aside>

        <details class="faq">
            <summary>FAQ</summary>
            <h3>Bagaimana cara kerjanya?</h3>
            <p>Pilih tanggal gajianmu sekali. Jawaban dihitung dari tanggal di perangkatmu dan tersimpan di browser —
                tidak ada server, tidak ada data yang dikirim.</p>
            <h3>Aku dibayar dua kali sebulan, dong?</h3>
            <p>Saat ini satu setelan per orang: pilih tanggal yang paling kamu tunggu. Sisanya biarkan rindu yang
                bekerja.</p>
            <h3>Kenapa jawabanku beda dengan temanku?</h3>
            <p>Karena tanggal gajian kalian beda. Setelanmu ikut terbawa lewat tautan (misalnya <code>?gaji=25</code>),
                jadi cukup bagikan tautanmu.</p>
        </details>

        <footer class="ahg-footer">
            <p>Pindahan dari apakahhariini-gajian.com — dibuat dengan sabar dan kopi.</p>
            <p class="fineprint">Perhitungan memakai tanggal &amp; waktu perangkatmu.</p>
        </footer>
    </main>

    <div class="confetti" id="ahg-confetti" aria-hidden="true"></div>
</div>

<noscript><p class="ahg-noscript">JavaScript mati — versi manual: kalau hari ini tanggal gajianmu, berarti iya.</p></noscript>

<script>
(function () {
    'use strict';
    var root = document.querySelector('.ahg-app');
    if (!root) return;

    var $ = function (id) { return document.getElementById(id); };

    /* ---------- logika tanggal gajian (murni) ---------- */

    var DAY_MS = 86400000;
    var STORE_KEY = 'ahg:payday';

    function lastDayOf(y, m) { return new Date(y, m + 1, 0).getDate(); }

    function midnight(y, m, d) { return new Date(y, m, d); }

    // Tanggal melebihi panjang bulan dipatok ke hari terakhir: gaji 31 di
    // April jatuh pada 30 April, gaji 30 di Februari pada 28/29 Februari.
    function paydayOf(cfg, y, m) {
        var d = cfg === 'akhir' ? lastDayOf(y, m) : Math.min(cfg, lastDayOf(y, m));
        return midnight(y, m, d);
    }

    function nextMonthOf(y, m) { return m === 11 ? [y + 1, 0] : [y, m + 1]; }
    function prevMonthOf(y, m) { return m === 0 ? [y - 1, 11] : [y, m - 1]; }

    function situation(now, cfg) {
        var y = now.getFullYear();
        var m = now.getMonth();
        var today = midnight(y, m, now.getDate());
        var thisMonth = paydayOf(cfg, y, m);
        if (today.getTime() === thisMonth.getTime()) {
            var nx = nextMonthOf(y, m);
            return { isToday: true, today: today, prev: thisMonth, next: paydayOf(cfg, nx[0], nx[1]) };
        }
        if (today.getTime() > thisMonth.getTime()) {
            var nx2 = nextMonthOf(y, m);
            return { isToday: false, today: today, prev: thisMonth, next: paydayOf(cfg, nx2[0], nx2[1]) };
        }
        var pv = prevMonthOf(y, m);
        return { isToday: false, today: today, prev: paydayOf(cfg, pv[0], pv[1]), next: thisMonth };
    }

    function daysLeft(sit) {
        return Math.round((sit.next.getTime() - sit.today.getTime()) / DAY_MS);
    }

    var HYPE_YES = [
        'Selamat. Habiskan dengan bijak… atau tidak.',
        'Rekening bernapas kembali. Nikmati selama bisa.',
        'Hari ini kamu orang terkaya di grup keluarga.',
        'Checkout semua yang nangkring di keranjang sejak tanggal 1.'
    ];

    function statusLine(days) {
        if (days === 1) return 'Besok. Besok kamu bebas.';
        if (days <= 5) return 'Dikit lagi. Tahan sebentar.';
        if (days <= 10) return 'Masih agak jauh, tapi cahayanya udah kelihatan.';
        if (days <= 20) return 'Panjang masih jalannya. Hemat-hemat dulu.';
        return 'Kita semua di perahu yang sama. 💸';
    }

    var pick = function (arr) { return arr[Math.floor(Math.random() * arr.length)]; };

    /* ---------- setelan: validasi, storage, url ---------- */

    function normalizeCfg(raw) {
        if (raw === 'akhir') return 'akhir';
        var n = Number(raw);
        return Number.isInteger(n) && n >= 1 && n <= 31 ? n : null;
    }

    function readParam() {
        var raw = new URLSearchParams(location.search).get('gaji');
        return raw == null ? null : normalizeCfg(raw);
    }

    function readStore() {
        try {
            var raw = localStorage.getItem(STORE_KEY);
            return raw == null ? null : normalizeCfg(raw);
        } catch (e) { return null; }
    }

    function writeStore(v) {
        try { localStorage.setItem(STORE_KEY, String(v)); } catch (e) { /* private mode */ }
    }

    // Tautan membawa setelan: siapa pun yang menerima link melihat gajianmu.
    function syncUrl(v) {
        var q = new URLSearchParams();
        q.set('gaji', String(v));
        history.replaceState(null, '', location.pathname + '?' + q + location.hash);
    }

    function sharePayload(isToday, cfg) {
        var url = location.origin + location.pathname + '?gaji=' + encodeURIComponent(String(cfg));
        var text = isToday
            ? 'Hari ini GAJIAN! 🎉 Cek punyamu:'
            : 'Belum gajian… 😭 Cek punyamu:';
        return { url: url, text: text };
    }

    /* ---------- state ---------- */

    var cfg = readParam() != null ? readParam() : (readStore() != null ? readStore() : 25);
    var lastLinesKey = '';
    var yesLine = '';
    var noLine = '';
    var lastPayloadStr = '';
    var lastGo;

    var el = {
        answer: $('ahg-answer'),
        status: $('ahg-status'),
        cdLabel: $('ahg-cd-label'),
        d: $('ahg-cd-d'), h: $('ahg-cd-h'), m: $('ahg-cd-m'), s: $('ahg-cd-s'),
        progress: $('ahg-progress'),
        fill: $('ahg-fill'),
        progText: $('ahg-prog-text'),
        chips: $('ahg-chips'),
        form: $('ahg-form'),
        input: $('custom-day'),
        shNative: $('ahg-sh-native'),
        shWa: $('ahg-sh-wa'), shX: $('ahg-sh-x'), shTg: $('ahg-sh-tg'), shFb: $('ahg-sh-fb'),
        shCopy: $('ahg-sh-copy'),
        shareUrl: $('ahg-share-url'),
        confetti: $('ahg-confetti')
    };

    /* ---------- render ---------- */

    function renderCountdown(sit, now) {
        var t = Math.max(0, Math.floor((sit.next.getTime() - now.getTime()) / 1000));
        var d = Math.floor(t / 86400); t -= d * 86400;
        var h = Math.floor(t / 3600); t -= h * 3600;
        var mi = Math.floor(t / 60);
        var sec = t - mi * 60;
        el.d.textContent = String(d);
        el.h.textContent = String(h).padStart(2, '0');
        el.m.textContent = String(mi).padStart(2, '0');
        el.s.textContent = String(sec).padStart(2, '0');

        var span = sit.next.getTime() - sit.prev.getTime();
        var pct = span > 0 ? Math.min(100, Math.max(0, ((now - sit.prev) / span) * 100)) : 0;
        el.fill.style.width = pct.toFixed(2) + '%';
        el.progress.setAttribute('aria-valuenow', String(Math.round(pct)));
        el.progText.textContent = 'Perjalanan ini sudah ditempuh ' + Math.floor(pct) + '%';
    }

    function updateShare(sit) {
        var p = sharePayload(sit.isToday, cfg);
        var key = p.url + '|' + p.text;
        if (key === lastPayloadStr) return;
        lastPayloadStr = key;
        el.shareUrl.textContent = p.url;
    }

    function render() {
        var now = new Date();
        var sit = situation(now, cfg);

        // Teks status stabil sepanjang hari kalender untuk satu setelan —
        // bukan acak ulang tiap detik.
        var key = now.toDateString() + '|' + String(cfg);
        if (key !== lastLinesKey) {
            lastLinesKey = key;
            yesLine = pick(HYPE_YES);
            noLine = statusLine(daysLeft(sit));
        }

        el.answer.textContent = sit.isToday ? 'IYA!' : 'BELUM.';
        el.answer.classList.toggle('yes', sit.isToday);
        el.answer.classList.toggle('no', !sit.isToday);
        el.status.textContent = sit.isToday ? yesLine : noLine;
        el.cdLabel.textContent = sit.isToday ? 'Gajian berikutnya dalam:' : 'Menuju gajian dalam:';
        document.title = sit.isToday
            ? 'IYA — hari ini gajian!'
            : 'Belum gajian — Apakah Hari Ini Gajian?';

        renderCountdown(sit, now);
        updateShare(sit);
        confettiTick(sit.isToday);
    }

    /* ---------- confetti ---------- */

    var CONFETTI_COLORS = ['#a3e635', '#4ade80', '#facc15', '#38bdf8', '#f472b6', '#fb923c'];

    // Menembak tiap kali hari gajian mulai (termasuk load langsung di hari gajian).
    function confettiTick(go) {
        if (lastGo === go) return;
        lastGo = go;
        if (!go) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        el.confetti.replaceChildren();
        for (var i = 0; i < 140; i++) {
            var p = document.createElement('i');
            var size = 6 + Math.random() * 8;
            p.style.left = Math.random() * 100 + 'vw';
            p.style.width = size + 'px';
            p.style.height = size * (0.5 + Math.random()) + 'px';
            p.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
            p.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
            p.style.animationDuration = (2.4 + Math.random() * 2.2) + 's';
            p.style.animationDelay = (Math.random() * 0.6) + 's';
            el.confetti.appendChild(p);
        }
        setTimeout(function () { el.confetti.replaceChildren(); }, 6000);
    }

    /* ---------- pengaturan ---------- */

    function markChips() {
        el.chips.querySelectorAll('.chip').forEach(function (chip) {
            chip.classList.toggle('active', chip.getAttribute('data-cfg') === String(cfg));
        });
        if (typeof cfg === 'number') el.input.value = String(cfg);
    }

    function setCfg(v) {
        cfg = v;
        writeStore(v);
        syncUrl(v);
        markChips();
        render();
    }

    el.chips.addEventListener('click', function (e) {
        var chip = e.target.closest('.chip');
        if (!chip) return;
        var v = normalizeCfg(chip.getAttribute('data-cfg'));
        if (v != null) setCfg(v);
    });

    el.form.addEventListener('submit', function (e) {
        e.preventDefault();
        var v = normalizeCfg(String(el.input.value).trim());
        if (v == null) {
            el.input.value = typeof cfg === 'number' ? String(cfg) : '';
            el.input.focus();
            return;
        }
        setCfg(v);
    });

    /* ---------- bagikan ---------- */

    var targets = {
        wa: function (p) { return 'https://wa.me/?text=' + encodeURIComponent(p.text + ' ' + p.url); },
        x: function (p) { return 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(p.text) + '&url=' + encodeURIComponent(p.url); },
        tg: function (p) { return 'https://t.me/share/url?url=' + encodeURIComponent(p.url) + '&text=' + encodeURIComponent(p.text); },
        fb: function (p) { return 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(p.url); }
    };

    function open(net) {
        window.open(targets[net](sharePayload(document.title.indexOf('IYA') === 0, cfg)), '_blank', 'noopener,noreferrer');
    }
    el.shWa.addEventListener('click', function () { open('wa'); });
    el.shX.addEventListener('click', function () { open('x'); });
    el.shTg.addEventListener('click', function () { open('tg'); });
    el.shFb.addEventListener('click', function () { open('fb'); });

    if (typeof navigator !== 'undefined' && 'share' in navigator) {
        el.shNative.style.display = '';
        el.shNative.addEventListener('click', function () {
            var sit = situation(new Date(), cfg);
            navigator.share({ title: document.title, url: sharePayload(sit.isToday, cfg).url, text: sharePayload(sit.isToday, cfg).text })
                .catch(function () { /* dibatalkan pengguna */ });
        });
    }

    var copyTimer;
    el.shCopy.addEventListener('click', function () {
        var url = sharePayload(situation(new Date(), cfg).isToday, cfg).url;
        var done = function (ok) {
            el.shCopy.textContent = ok ? 'Tersalin ✓' : 'Gagal menyalin';
            el.shCopy.disabled = true;
            clearTimeout(copyTimer);
            copyTimer = setTimeout(function () {
                el.shCopy.textContent = 'Salin tautan';
                el.shCopy.disabled = false;
            }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(function () { done(true); }, function () { done(fallbackCopy(url)); });
        } else {
            done(fallbackCopy(url));
        }
    });

    function fallbackCopy(text) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        var ok = false;
        try { ok = document.execCommand('copy'); } catch (e) { /* nope */ }
        ta.remove();
        return ok;
    }

    /* ---------- start ---------- */

    writeStore(cfg);
    syncUrl(cfg);
    markChips();
    render();
    setInterval(render, 1000);
})();
</script>

<style>
/* apakahhariini-gajian.com — ported from Svelte, scoped under .ahg-app */
.ahg-app {
    --bg: #0b0e09;
    --surface: #131710;
    --line: #27301f;
    --text: #f1f5ea;
    --muted: #96a189;
    --lime: #a3e635;
    --green: #4ade80;
    --red: #fb7185;
    --amber: #fbbf24;
    --radius: 16px;

    background: var(--bg);
    color: var(--text);
    border-radius: var(--radius);
    overflow: hidden;
}

.ahg-app * {
    box-sizing: border-box;
}

.ahg-app main {
    width: min(720px, 92vw);
    margin-inline: auto;
    text-align: center;
    padding: clamp(24px, 6vh, 56px) 0 24px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
}

/* ---------- hero ---------- */

.ahg-app .question {
    text-transform: uppercase;
    letter-spacing: 0.42em;
    padding-left: 0.42em; /* optically recenters tracked-out caps */
    font-weight: 600;
    color: var(--muted);
    font-size: clamp(0.78rem, 2.6vw, 1rem);
    margin-bottom: 0.4em;
}

.ahg-app .answer {
    font-weight: 900;
    text-transform: uppercase;
    line-height: 0.92;
    letter-spacing: -0.03em;
    font-size: clamp(64px, 16vw, 160px);
    margin: 0;
}

.ahg-app .answer.yes {
    background: linear-gradient(100deg, var(--lime), var(--green) 45%, var(--amber));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    filter: drop-shadow(0 0 28px rgba(163, 230, 53, 0.28));
}

.ahg-app .answer.no { color: var(--red); }

.ahg-app .status {
    color: var(--muted);
    font-size: clamp(1rem, 3vw, 1.2rem);
    min-height: 1.6em;
    margin-top: 0.6em;
}

/* ---------- countdown ---------- */

.ahg-app .countdown { margin-top: clamp(24px, 5vh, 44px); }

.ahg-app .cd-label {
    text-transform: uppercase;
    letter-spacing: 0.18em;
    font-size: 0.8rem;
    color: var(--muted);
}

.ahg-app .cd-grid {
    display: flex;
    justify-content: center;
    gap: clamp(10px, 3vw, 22px);
    margin: 12px 0 18px;
}

.ahg-app .cd-cell {
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: var(--radius);
    padding: 12px 6px;
    width: clamp(66px, 17vw, 92px);
}

.ahg-app .cd-num {
    display: block;
    font-size: clamp(1.5rem, 6vw, 2.3rem);
    font-weight: 800;
    font-variant-numeric: tabular-nums;
    line-height: 1.1;
}

.ahg-app .cd-unit {
    display: block;
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
    margin-top: 2px;
}

.ahg-app .progress {
    height: 10px;
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 999px;
    overflow: hidden;
}

.ahg-app .progress .fill {
    height: 100%;
    width: 0;
    background: linear-gradient(90deg, var(--green), var(--lime));
    border-radius: inherit;
    transition: width 0.8s ease;
}

.ahg-app .prog-text { font-size: 0.82rem; color: var(--muted); margin-top: 8px; }

/* ---------- sections ---------- */

.ahg-app section { margin-top: clamp(36px, 7vh, 64px); }

.ahg-app h2 {
    font-size: clamp(1.15rem, 4vw, 1.45rem);
    margin-bottom: 16px;
    letter-spacing: -0.01em;
}

.ahg-app .chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }

.ahg-app .chip {
    cursor: pointer;
    font: inherit;
    font-weight: 700;
    color: var(--text);
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 999px;
    padding: 10px 20px;
    min-width: 44px;
    transition: border-color 0.15s, background 0.15s, transform 0.15s;
}

.ahg-app .custom {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 14px;
}

.ahg-app .custom label { color: var(--muted); font-size: 0.95rem; }

.ahg-app .custom input {
    font: inherit;
    font-weight: 700;
    color: var(--text);
    text-align: center;
    width: 110px;
    background: var(--bg);
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 10px 12px;
}

.ahg-app .custom input:focus-visible,
.ahg-app .chip:focus-visible,
.ahg-app .btn:focus-visible,
.ahg-app summary:focus-visible { outline: 2px solid var(--lime); outline-offset: 2px; }

.ahg-app .hint { font-size: 0.8rem; color: var(--muted); margin-top: 12px; }

/* ---------- share ---------- */

.ahg-app .share-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }

.ahg-app .btn {
    cursor: pointer;
    font: inherit;
    font-weight: 700;
    border-radius: 999px;
    padding: 11px 20px;
    min-height: 44px;
    white-space: nowrap;
    transition: transform 0.15s, filter 0.15s;
}

.ahg-app .btn:hover { transform: translateY(-1px); filter: brightness(1.06); }
.ahg-app .btn:disabled { opacity: 0.65; cursor: default; transform: none; }
.ahg-app .btn-primary { background: var(--lime); color: #101505; border: 1px solid var(--lime); }
.ahg-app .btn-ghost { background: transparent; color: var(--text); border: 1px solid var(--line); }
.ahg-app .btn-ghost:hover { border-color: var(--muted); }

.ahg-app .share-url {
    display: block;
    margin-top: 14px;
    color: var(--muted);
    font-size: 0.8rem;
    word-break: break-all;
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 10px 12px;
}

/* ---------- ads & merch ---------- */

.ahg-app .ad-slot {
    /* Disembunyikan sementara — hapus baris ini saat unit AdSense dipasang. */
    display: none;
    margin-top: clamp(36px, 7vh, 64px);
    border: 1px dashed var(--line);
    border-radius: var(--radius);
    padding: 28px 12px;
    color: var(--muted);
    font-size: 0.85rem;
}

.ahg-app .merch-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
    gap: 14px;
    text-align: left;
}

.ahg-app .card {
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: var(--radius);
    padding: 20px;
}

.ahg-app .card-emoji { font-size: 2rem; margin-bottom: 8px; }
.ahg-app .card h3 { font-size: 1rem; line-height: 1.35; margin-bottom: 8px; }

.ahg-app .badge {
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--amber);
    border: 1px solid var(--line);
    border-radius: 999px;
    padding: 3px 10px;
}

/* ---------- faq & footer ---------- */

.ahg-app .faq {
    margin-top: clamp(36px, 7vh, 64px);
    text-align: left;
    border: 1px solid var(--line);
    border-radius: var(--radius);
    padding: 16px 20px;
    background: var(--surface);
}

.ahg-app .faq summary { cursor: pointer; font-weight: 800; list-style: none; }
.ahg-app .faq summary::-webkit-details-marker { display: none; }
.ahg-app .faq summary::before { content: "+ "; color: var(--lime); }
.ahg-app .faq[open] summary::before { content: "− "; }
.ahg-app .faq h3 { font-size: 0.98rem; margin: 14px 0 4px; }
.ahg-app .faq p { color: var(--muted); font-size: 0.92rem; }
.ahg-app .faq code { color: var(--lime); }

.ahg-app .ahg-footer {
    text-align: center;
    padding: 28px 16px 40px;
    color: var(--muted);
    font-size: 0.85rem;
}

.ahg-app .fineprint { font-size: 0.75rem; margin-top: 4px; opacity: 0.75; }

.ahg-noscript {
    position: fixed;
    inset: auto 12px 12px;
    background: var(--amber, #fbbf24);
    color: #201500;
    font-weight: 700;
    padding: 12px 16px;
    border-radius: 12px;
    z-index: 50;
}

/* ---------- confetti ---------- */

.ahg-app .confetti {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 99;
    overflow: hidden;
}

.ahg-app .confetti i {
    position: absolute;
    top: -5vh;
    display: block;
    border-radius: 2px;
    animation: ahg-fall linear forwards;
}

@keyframes ahg-fall {
    to { transform: translateY(115vh) rotate(720deg); }
}

/* ---------- misc ---------- */

@media (max-width: 420px) {
    .ahg-app .custom { flex-direction: column; }
    .ahg-app .custom input { width: 130px; }
}

@media (prefers-reduced-motion: reduce) {
    .ahg-app *, .ahg-app *::before, .ahg-app *::after {
        animation-duration: 0.001s !important;
        transition-duration: 0.001s !important;
    }
}
</style>
