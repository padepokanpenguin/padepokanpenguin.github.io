---
title: "Debugging Deployment GitHub Pages: Perjalanan Seorang Developer"
date: 2025-09-07T15:00:00+07:00
draft: false
tags: ["debugging", "github-pages", "hugo", "devops", "troubleshooting"]
categories: ["tutorial", "story"]
description: "Cerita pengalaman debugging deployment situs Hugo di GitHub Pages yang tiba-tiba kena error 404 — padahal GitHub Actions-nya sendiri berjalan tanpa error."
---

Sore itu, seperti biasa, saya push kode blog saya ke GitHub. Semuanya normal — GitHub Actions jalan, build successful, deployment complete. Tapi begitu saya buka blog saya...

**404.**

Tidak ada error di GitHub Actions. Tidak ada warning di logs. Blog просто tidak mau muncul.

Mari saya ceritakan perjalanan debugging-nya.

## Langkah 1: Revert, Tapi Masalah Tetap Ada

第一步, saya cek perubahan terbaru. Apakah saya touching anything yang terkait dengan deployment? Tidak. Semua perubahan hanya soal konten.

Saya coba revert ke commit sebelumnya — biar lihat apakah masalahnya memang dari perubahan terakhir atau tidak.

Hasilnya? Tetap 404.

Saya mulai curiga ini bukan soal kode yang saya ubah.

Coba cek GitHub Actions:

```bash
gh run list --limit 10
```

Keliatan ada pattern:
- ✅ Deployment terbaru: "Use Hugo 0.123.0..." — Berhasil
- ❌ Percobaan sebelumnya: "Update Hugo version..." — Gagal
- ✅ Lebih awal lagi: "Revert Hugo version..." — Berhasil

Jadi masalahnya bermula dari percobaan update Hugo.

```bash
gh run view 16703525626 --log-failed
```

## Langkah 2: Error yang Tidak Terduga

Dari log, error-nya ternyata:

```
ERROR render of "/" failed: partial "partials/templates/_funcs/get-page-images" not found
```

Wait, seriously? Saya sudah pakai theme ini berbulan-bulan dan tiba-tiba missing partial?

Saya cek submodule status:

```bash
git submodule status
```

Output: `-dad94ab4b7c55eea0b63f7b81419d027fe9a8d81 themes/PaperMod`

**Tanda negatif** di depan commit hash. Itu artinya submodule belum diinisialisasi. Direktori `themes/PaperMod` basically kosong.

Ironis.

Solusinya straightforward:

```bash
git submodule update --init --recursive
```

```
Submodule 'themes/PaperMod' registered for path 'themes/PaperMod'
Cloning into 'themes/PaperMod'...
Submodule path 'themes/PaperMod': checked out 'dad94ab4b7c55eea0b63f7b81419d027fe9a8d81'
```

Selesai. Tapi tunggu, ada lagi.

## Langkah 3: Duplikat Submodule

Saya cek `.gitmodules` dan menemukan ini:

```ini
[submodule "PaperMod"]
    path = PaperMod
    url = https://github.com/adityatelange/hugo-PaperMod.git
[submodule "themes/PaperMod"]
    path = themes/PaperMod
    url = https://github.com/adityatelange/hugo-PaperMod.git
```

Two entries untuk submodule yang sama — tapi dengan path berbeda. Saya hapus yang `PaperMod` (tanpa `themes/`) dan сохраняю yang `themes/PaperMod`.

Next, kompatibilitas versi. GitHub Actions yang gagal tadi pakai Hugo 0.148.0. Tapi versi tersebut punya breaking changes yang hapus `.Site.Social` — sesuatu yang masih digunakan PaperMod versi lama.

Action yang saya ambil:
1. Update PaperMod ke v8.0
2. Kunci Hugo ke versi stabil 0.123.0

```bash
cd themes/PaperMod
git checkout v8.0
```

## Langkah 4: GitHub Actions Berhasil, Tapi Tetap 404

Oke, semua masalah di atas sudah diperbaiki. Saya commit, push, dan GitHub Actions jalan dengan smooth:

- ✅ Install Hugo CLI
- ✅ Checkout (with submodules)
- ✅ Setup Pages
- ✅ Build with Hugo
- ✅ Upload artifact
- ✅ Deploy

Tidak ada error. Semuanya hijau.

Tapi begitu buka blog...

**404 lagi.**

Ini yang paling frustrating. Kode sudah benar, build sudah berhasil, tapi hasilnya 404. Where is the problem?

Saya coba cek GitHub Pages API:

```bash
gh api repos/padepokanpenguin/padepokanpenguin.github.io/pages
```

Response-nya reveal everything:

```json
{
  "build_type": "legacy",
  "source": {
    "branch": "master",
    "path": "/"
  }
}
```

**Build type "Legacy"**.

WHOA. Di sini masalahnya.

Walaupun saya sudah punya custom Hugo GitHub Actions workflow yang berjalan sempurna, GitHub Pages mengabaikannya sepenuhnya. Instead, dia mencoba build dengan Jekyll — sistem lama. Karena tidak ada Jekyll config di repo ini, yang muncul ya 404.

## Langkah 5: Pengaturan yang Tersembunyi

Solusinya ternyata simple — tapi lokasinya tidak obvious.

Saya harus ubah GitHub Pages source dari "Deploy from a branch" ke **"GitHub Actions"** langsung dari repository settings.

Sekarang GitHub paham: "Oke, saya tidak akan coba build sendiri. Gunakan workflow custom yang sudah provided."

Setelah itu, blog langsung bisa diakses normal.

## Pelajaran yang Dipetik

Dari pengalaman ini, ada beberapa hal yang saya realise:

1. **Submodule perlu di-init** — Tanda `-` di `git submodule status` artinya submodule belum checkout. Jangan assume karena ada di repo, berarti sudah ready.

2. **Versi yang lebih baru tidak selalu lebih baik** — Hugo 0.148.0 punya breaking changes. Kadang locked ke versi stabil itu pilihan yang lebih bijak.

3. **Settings bisa override kode** — Sekecil apapun repository settings bisa membuat workflow yang sudah perfect jadi tidak digunakan.

4. **Error message tidak selalu menunjukkan letak masalah** — Dari luar看起来 semua normal. Masalah sebenarnya ada di pengaturan platform, bukan di kode.

## Best Practices Debugging yang Saya Terapkan

### 1. Cek Perubahan Terbaru Dulu
Gunakan `git log` dan riwayat GitHub Actions untuk lihat apa yang berubah. Biasanya jawabannya ada di situ.

### 2. Follow the Error Trail
Setiap error message itu petunjuk. Dari missing partial → submodule issue → versi conflict → settings problem. errors lead to next clue.

### 3. Verify Asumsi
Saya assume GitHub Actions workflow saya yang dijalankan. Fakta di lapangan bilang lain. Selalu verify, jangan assume.

### 4. Fix Satu Per Satu
Jangan coba fix semua sekaligus. Saya pisahkan: submodule dulu, then versi, then settings. Lebih mudah track apa yang solve apa.

### 5. Document the Journey
Menulis pengalaman ini bukan cuma buat kalian — tapi juga buat diri saya sendiri di masa depan ketika hal yang sama terjadi lagi.

## Penutup

Setelah setting GitHub Pages diubah ke GitHub Actions workflow, blog finally bisa diakses lagi.

Kadang bug yang paling bikin frustrasi justru yang teach kita paling banyak. Pengalaman ini mengingatkan saya bahwa dalam development, masalah tidak selalu ada di kode yang kita tulis — kadang ada di configuration platform yang kita assume sudah benar.

Jadi, jangan malas baca dokumentasi. Jangan malas debug. Dan kalau sudah menyerah... coba cek settings-nya. 😆
