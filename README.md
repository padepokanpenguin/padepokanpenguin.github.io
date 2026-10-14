# 🐧 Padepokan Penguin Portfolio
> Portfolio & Creative Lab untuk **padepokanpenguin.github.io** — Padepokan Archive.

Built with **Svelte 5 (Runes)**, **Tailwind CSS v4**, dan **Web Audio API** untuk performa static 60 FPS pada GitHub Pages.

---

## ✨ Fitur Kunci

- **Dedicated Article Routes (`/blog/[slug]`)**: Setiap artikel memiliki rute URL mandiri yang di-prerender statis menjadi file HTML utuh, mendukung navigasi browser (Back/Forward), bookmark, dan social sharing langsung.
- **Live Real-Time Visitor Counter**:
  - **Counter Global (Footer)**: Menghitung total pengunjung unik situs secara real-time via `api.visitorbadge.io` tanpa hardcode/baseline.
  - **Counter per Artikel**: Menghitung jumlah pembaca per rute artikel (`/blog/[slug]`) secara live.
  - **Deduplikasi Fingerprint & IP**: Dilengkapi sistem verifikasi Browser Fingerprint (hardware, canvas, timezone, screen) dan IP publik via `api.ipify.org` agar reload/refresh tidak melipatgandakan hit counter.
- **Optimasi SEO Lengkap**:
  - `static/sitemap.xml`: XML sitemap resmi berisi rute beranda dan seluruh artikel dengan prioritas serta tanggal modifikasi (`lastmod`).
  - `static/robots.txt`: Direktif perayapan mesin pencari terhubung ke sitemap.
  - Open Graph & Twitter Cards: Metadata sosial lengkap (`og:title`, `og:image`, `og:type="article"`, Twitter cards).
  - Structured Data (JSON-LD Schema.org): Skema `@graph` untuk `Person` dan `WebSite` di beranda, serta skema `BlogPosting` pada setiap rute artikel.
- **Lentera Taktil Padepokan (`LanternToggle.svelte`)**: Lentera minyak padepokan dengan nyala api hidup, kedipan dinamis, asap saat padam, dan saklar pergantian tema taktil dengan efek audio korek api dan hembusan angin.
- **Interactive Companion Mascot (`PenguinMascot.svelte`)**: Maskot penguin reaktif dengan mata yang melacak kursor secara elastis via Svelte 5 `Spring`. Klik maskot untuk reaksi squash-and-stretch dan dialog dinamis.
- **Padepokan Archive (`DeskBook.svelte`)**: Buku catatan meja kerja interaktif dengan tab navigasi (*Padepokan*, *Karya*, *Coretan*, *Lab Fisika*, *Markas*), pembaca artikel Markdown instan, animasi coretan spidol (`in:draw`), sinkronisasi URL hash (`#projects`, `#blog`), dan dukungan navigasi keyboard panah kiri/kanan (`[← / →]`).
- **Draggable Desk Stickers (`DeskSticker.svelte`)**: Stiker, stempel, dan selotip yang dapat digeser bebas di atas meja kerja dengan inersia dan audio thud saat dijatuhkan.
- **Zero-Asset Procedural Audio Synthesizer (`audio.ts`)**: Efek suara taktil murni disintesis via Web Audio API tanpa beban aset MP3 eksternal.
- **Static Prerender Ready**: Dikonfigurasi penuh dengan `@sveltejs/adapter-static` untuk hosting gratis di GitHub Pages.

---

## 🛠️ Tech Stack

- **Framework**: [Svelte 5](https://svelte.dev) + [SvelteKit](https://kit.svelte.dev)
- **Adapter**: `@sveltejs/adapter-static` (`prerender = true`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Physics & Motion**: `svelte/motion` (`Spring`), Canvas 2D Verlet Integration, SVG `in:draw`
- **Audio**: Web Audio API (Synthesizer Oscillators & Biquad Filters)
- **Fonts**: Fraunces, Inter, Caveat, JetBrains Mono
- **Analytics / Counter**: `api.visitorbadge.io` dengan deduplikasi Browser Fingerprint + IP

---

## 🚀 Menjalankan Proyek

### 1. Jalankan Development Server
```bash
npm run dev
```
Akses di browser pada `http://localhost:5173`.

### 2. Build untuk Produksi
```bash
npm run build
```
Hasil file statis akan berada di folder `./build` (lengkap dengan `index.html`, rute `/blog/*.html`, dan `404.html`).

### 3. Deploy ke GitHub Pages
Proyek sudah dilengkapi dengan workflow GitHub Actions (`.github/workflows/deploy.yml`).

Cukup sambungkan repositori dan push ke branch `master`:
```bash
git add .
git commit -m "feat: update portfolio"
git push origin master
```

Pada pengaturan repositori GitHub:
1. Masuk ke **Settings** > **Pages**.
2. Pada **Build and deployment > Source**, pilih **GitHub Actions**.
3. Website akan otomatis live di `https://padepokanpenguin.github.io`.
