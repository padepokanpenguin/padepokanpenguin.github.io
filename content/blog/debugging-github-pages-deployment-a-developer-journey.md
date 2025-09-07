---
title: "Debugging Deployment GitHub Pages: Perjalanan Seorang Developer"
date: 2025-09-07T15:00:00+07:00
draft: false
tags: ["debugging", "github-pages", "hugo", "devops", "troubleshooting"]
categories: ["tutorial", "story"]
description: "debugging deployment situs Hugo di GitHub Pages dengan error 404."
---

Pada suatu sore saya mencoba melakukan update pada blog yang saya buat tapi setelah proses github action selesai, sesuatu yang tidak terduga terjadi, blog saya terkena error 404 tapi tidak terdapat error pada proses github action.

## Langkah 1: Pembukaan

Saya memulai investigasi dengan memeriksa perubahan terbaru. Perubahan ayng saya buat tidak menyentuh proses github action sama sekali, karena bingung pada error yang terjadi. Saya mencoba untuk mengembalikan perubahan terakhir yang saya buat, untuk melihat apakah jika mengggunakan kode sebelum diubah akan terjadi hal yang sama atau tidak. Tapi takdir berkata lain, walaupaun saya mengembalikan kode kepada keadaan sebelum ada perubahan, hasilnya sama terdapat error 404 ketika membuka blog.

Setelah itu saya mencoba untuk melakukan investigasi lebih lanjut:

```bash
gh run list --limit 10
```

Terdapat error update hugo di proses deployment sebelumnya:
- ✅ Deployment terbaru: "Use Hugo 0.123.0..." - Berhasil
- ❌ Percobaan sebelumnya: "Update Hugo version..." - Gagal  
- ✅ Lebih awal lagi: "Revert Hugo version..." - Berhasil

```bash
gh run view 16703525626 --log-failed
```

## Langkah 2: Investigasi Error

Log error menggambarkan masalah dengan jelas:

```
ERROR render of "/" failed: partial "partials/templates/_funcs/get-page-images" not found
```

Saya cukup terkejut. Karena setelah telah menggunakan theme ini selama berbulan-bulan tanpa masalah.

Saya memeriksa status submodule:

```bash
git submodule status
```

Output menunjukkan: `-dad94ab4b7c55eea0b63f7b81419d027fe9a8d81 themes/PaperMod`

Tanda negatif itu menunjukkan submodule yang tidak diinisialisasi. Dan saya masih menelusuri kenapa direktori themes benar-benar kosong.

Ternyata Git submodule tidak diinisialisasi dengan benar. Ini adalah kesalahan yang cukup sepele.

Saya mencoba memperbaiki ini segera:

```bash
git submodule update --init --recursive
```

```
Submodule 'themes/PaperMod' registered for path 'themes/PaperMod'
Cloning into 'themes/PaperMod'...
Submodule path 'themes/PaperMod': checked out 'dad94ab4b7c55eea0b63f7b81419d027fe9a8d81'
```

## Langkah 3: PaperMod Error

Saya menemukan masalah lain di file `.gitmodules`, entri submodule duplikat:

```ini
[submodule "PaperMod"]
    path = PaperMod
    url = https://github.com/adityatelange/hugo-PaperMod.git
[submodule "themes/PaperMod"]
    path = themes/PaperMod
    url = https://github.com/adityatelange/hugo-PaperMod.git
```

Untuk masalah ini saya hapus salah satu submodule tersebut dan menyisakan `themes/PaperMod`.

Kemudian saya menginvestigasi apakah ada masalah kompatibilitas versi Hugo. Pada proses deployment yang gagal menggunakan Hugo 0.148.0, tetapi versi ini terdapat breaking changes yang menghapus `.Site.Social` - sesuatu yang masih digunakan theme PaperMod.

Dan berikut adalah langkah yang saya lakukan untuk memperbaiki ini:
1. Update PaperMod ke versi terbaru (v8.0)
2. Menggunakan versi Hugo yang stabil (0.123.0) yang bekerja dengan theme

```bash
cd themes/PaperMod
git checkout v8.0
```

## Langkah 4: Git Action Config Error

Setelah memastikan tidak ada error saya melakukan commit dan push commit tersebut ke github agar melakukan triggger dan memperbaru proses gagal deploy sebelumnya:

- ✅ Install Hugo CLI
- ✅ Checkout (dengan submodules)
- ✅ Setup Pages  
- ✅ Build with Hugo
- ✅ Upload artifact
- ✅ Deploy

Dari proses github action tidak terdapat error apapun. Namun, ketika saya mengunjungi situs saya... error 404 lagi.

Deployment berhasil, proses build tidak error, tetapi situs tidak muncul. Saya curiga ada masalah konfigurasi.

Saya memeriksa GitHub Pages API:

```bash
gh api repos/padepokanpenguin/padepokanpenguin.github.io/pages
```

Responnya mengungkapkan smoking gun:

```json
{
  "build_type": "legacy",
  "source": {
    "branch": "master",
    "path": "/"
  }
}
```

**Build type "Legacy"!** 

Saya telah menjalankan custom Hugo GitHub Actions workflow dengan sempurna, tetapi GitHub Pages sepenuhnya mengabaikannya. Sebaliknya, ia mencoba menggunakan sistem berbasis Jekyll lama untuk membangun situs saya. Karena saya tidak memiliki file Jekyll, ini menghasilkan... ya, error 404.

Perbaikannya ternyata sangat sederhana tetapi tersembunyi di pengaturan repository (repositoy setting). Saya perlu mengubah sumber GitHub Pages dari "Deploy from a branch" menjadi "GitHub Actions" di pengaturan repository.

Ini memberitahu GitHub: "Hei, jangan coba bangun situs ini sendiri. Gunakan workflow kustom yang sudah saya buat."

## Pelajaran yang Dipetik

Perjalanan debugging ini mengajarkan saya beberapa pelajaran berharga:

1. **Selalu periksa inisialisasi submodule** - Direktori kosong bisa menyesatkan
2. **Kompatibilitas versi itu penting** - Yang lebih baru tidak selalu lebih baik
3. **Konfigurasi bisa override kode** - Bahkan workflow sempurna bisa diabaikan oleh pengaturan yang salah
4. **Masalah sebenarnya mungkin bukan di tempat yang Anda pikirkan** - Kadang bukan kode Anda, tapi konfigurasi platform

## Praktik Debugging Terbaik yang Saya Terapkan

### 1. Mulai dengan Perubahan Terbaru
Saya mulai dengan memeriksa apa yang berubah baru-baru ini, menggunakan git logs dan riwayat GitHub Actions.

### 2. Ikuti Jejak Error
Setiap pesan error mengarah ke petunjuk berikutnya - dari error template ke masalah submodule hingga konflik versi.

### 3. Verifikasi Asumsi
Saya mengasumsikan GitHub Actions workflow saya sedang digunakan, tetapi API mengungkapkan sebaliknya.

### 4. Test Secara Bertahap
Saya memperbaiki masalah satu per satu: submodule dulu, kemudian versi, lalu konfigurasi.

### 5. Dokumentasikan Perjalanan
Menulis post ini membantu saya mengingat solusi untuk masalah serupa di masa depan.

## Penutup

Setelah mengubah pengaturan GitHub Pages untuk menggunakan GitHub Actions, akhirnya blog saya dapat diakses kembali.

Kadang bug yang paling frustasi mengajarkan kita yang paling banyak. Sesi debugging khusus ini mengingatkan saya bahwa dalam ekosistem pengembangan yang kompleks, masalah tidak selalu ada di kode kita - kadang ada di konfigurasi platform yang kita andalkan. Jadi jangan malas untuk membaca dokumentasi, jangan malas untuk melakukan debugging ketika system error😆.

---