# 🐧 Padepokan Penguin Portfolio
> Portfolio & Creative Lab untuk **padepokanpenguin.github.io** — Padepokan Archive.

Built with **Svelte 5 (Runes)**, **Tailwind CSS v4**, dan **Web Audio API** untuk performa static 60 FPS pada GitHub Pages.

---

## ✨ Fitur Kunci

- **Lentera Taktil Padepokan (`LanternToggle.svelte`)**: Lentera minyak padepokan dengan nyala api hidup, kedipan dinamis, asap saat padam, dan saklar pergantian tema taktil dengan efek audio korek api dan hembusan angin.
- **Interactive Companion Mascot (`PenguinMascot.svelte`)**: Maskot penguin reaktif dengan mata yang melacak kursor secara elastis via Svelte 5 `Spring`. Klik maskot untuk reaksi squash-and-stretch dan dialog dinamis.
- **Padepokan Archive (`DeskBook.svelte`)**: Buku catatan meja kerja interaktif dengan tab navigasi (*Padepokan*, *Karya*, *Coretan*, *Lab Fisika*, *Markas*), pembaca artikel Markdown instan, animasi coretan spidol (`in:draw`), dan dukungan navigasi keyboard panah kiri/kanan (`[← / →]`).
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
Hasil file statis akan berada di folder `./build` (lengkap dengan `index.html` dan `404.html`).

### 3. Deploy ke GitHub Pages
Proyek sudah dilengkapi dengan workflow GitHub Actions (`.github/workflows/deploy.yml`).

Cukup sambungkan repositori dan push ke GitHub:
```bash
git remote add origin https://github.com/padepokanpenguin/padepokanpenguin.github.io.git
git add .
git commit -m "feat: initial interactive svelte 5 portfolio"
git push -u origin main
```

Pada pengaturan repositori GitHub:
1. Masuk ke **Settings** > **Pages**.
2. Pada **Build and deployment > Source**, pilih **GitHub Actions**.
3. Website akan otomatis live di `https://padepokanpenguin.github.io`.
