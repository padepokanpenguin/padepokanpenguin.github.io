---
title: "Debugging Deployment GitHub Pages: Perjalanan Seorang Developer"
date: 2025-08-03T17:00:00+07:00
draft: true
tags: ["debugging", "github-pages", "hugo", "devops", "troubleshooting"]
categories: ["tutorial", "story"]
description: "debugging deployment situs Hugo di GitHub Pages dengan error 404."
---

## Misteri Website yang Hilang

Itu adalah sore Sabtu yang biasa ketika saya menghadapi apa yang akan menjadi salah satu petualangan debugging yang mengingatkan mengapa pengembangan perangkat lunak adalah seni sekaligus sains. Blog Hugo saya telah berjalan dengan sempurna, tetapi tiba-tiba, pengunjung disambut dengan error 404 yang dingin dan tidak menyambut.

"Ini tidak mungkin benar," gumam saya, menatap browser yang menampilkan pesan menakutkan "Page not found" di `padepokanpenguin.github.io`.

## Bab 1: Petunjuk Pertama

Saya memulai investigasi seperti yang dilakukan developer mana pun - dengan memeriksa perubahan terbaru. GitHub Actions workflow saya menunjukkan pola yang aneh: beberapa run berhasil (✅), yang lain gagal (❌), dan yang terbaru mengklaim berjalan dengan baik.

```bash
gh run list --limit 10
```

Output mengungkapkan sebuah cerita:
- ✅ Deployment terbaru: "Use Hugo 0.123.0..." - Berhasil
- ❌ Percobaan sebelumnya: "Update Hugo version..." - Gagal  
- ✅ Lebih awal lagi: "Revert Hugo version..." - Berhasil

Ada yang salah dengan pembaruan versi Hugo. Saya menggali lebih dalam ke log run yang gagal:

```bash
gh run view 16703525626 --log-failed
```

## Bab 2: Misteri Template

Log error menggambarkan masalah dengan jelas:

```
ERROR render of "/" failed: partial "partials/templates/_funcs/get-page-images" not found
```

Hati saya merosot. Theme PaperMod kehilangan file template penting. Tapi mengapa? Saya telah menggunakan theme ini selama berbulan-bulan tanpa masalah.

Saya memeriksa status submodule:

```bash
git submodule status
```

Output menunjukkan: `-dad94ab4b7c55eea0b63f7b81419d027fe9a8d81 themes/PaperMod`

Tanda negatif itu adalah petunjuk nyata pertama saya - menunjukkan submodule yang tidak diinisialisasi. Plot menjadi rumit ketika saya menemukan direktori themes benar-benar kosong.

## Bab 3: Saga Submodule

"Tentu saja!" seru saya. Git submodule tidak diinisialisasi dengan benar. Ini adalah kesalahan klasik yang mengejutkan bahkan developer berpengalaman.

Saya memperbaiki ini segera:

```bash
git submodule update --init --recursive
```

Menyaksikan output terminal saat mengkloning theme PaperMod memberi saya rasa lega:

```
Submodule 'themes/PaperMod' registered for path 'themes/PaperMod'
Cloning into 'themes/PaperMod'...
Submodule path 'themes/PaperMod': checked out 'dad94ab4b7c55eea0b63f7b81419d027fe9a8d81'
```

Tapi perayaan saya terlalu dini.

## Bab 4: Jebakan Kompatibilitas Versi

Saya menemukan masalah lain yang mengintai di file `.gitmodules` saya - entri submodule duplikat:

```ini
[submodule "PaperMod"]
    path = PaperMod
    url = https://github.com/adityatelange/hugo-PaperMod.git
[submodule "themes/PaperMod"]
    path = themes/PaperMod
    url = https://github.com/adityatelange/hugo-PaperMod.git
```

Saya membersihkan ini, hanya menyimpan entri yang benar untuk `themes/PaperMod`.

Kemudian saya menangani masalah kompatibilitas versi Hugo. Deployment yang gagal telah mencoba menggunakan Hugo 0.148.0, tetapi versi ini memperkenalkan breaking changes yang menghapus `.Site.Social` - sesuatu yang masih digunakan theme PaperMod.

Saya membuat keputusan strategis:
1. Update PaperMod ke versi terbaru (v8.0)
2. Menggunakan versi Hugo yang stabil (0.123.0) yang bekerja dengan theme

```bash
cd themes/PaperMod
git checkout v8.0
```

## Bab 5: Sukses Deployment... Atau Begitu Saya Kira

Setelah commit perbaikan saya, saya menyaksikan GitHub Actions run dengan penuh harap. Tanda centang hijau muncul di semua langkah:

- ✅ Install Hugo CLI
- ✅ Checkout (dengan submodules)
- ✅ Setup Pages  
- ✅ Build with Hugo
- ✅ Upload artifact
- ✅ Deploy

Hugo melaporkan berhasil membangun 37 halaman. Semuanya terlihat sempurna di log. Namun, ketika saya mengunjungi situs saya... error 404 lagi.

## Bab 6: Dalang Konfigurasi Tersembunyi

Di sinilah pekerjaan detektif yang sesungguhnya dimulai. Deployment berhasil, file dibangun dengan benar, tetapi situs tidak muncul. Saya curiga ada masalah konfigurasi.

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

## Bab 7: Solusinya

Perbaikannya ternyata sangat sederhana tetapi tersembunyi di pengaturan repository. Saya perlu mengubah sumber GitHub Pages dari "Deploy from a branch" menjadi "GitHub Actions" di pengaturan repository.

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

## Akhir yang Bahagia

Setelah mengubah pengaturan GitHub Pages untuk menggunakan GitHub Actions, situs saya akhirnya kembali hidup. 37 halaman yang berhasil dibangun Hugo kini dapat diakses dengan benar oleh pengunjung.

Kadang bug yang paling frustasi mengajarkan kita yang paling banyak. Sesi debugging khusus ini mengingatkan saya bahwa dalam ekosistem pengembangan yang kompleks, masalah tidak selalu ada di kode kita - kadang ada di konfigurasi platform yang kita andalkan.

---

*Apakah Anda pernah mengalami misteri deployment serupa? Bagikan cerita perang debugging Anda di komentar di bawah. Ingat, setiap bug adalah kesempatan belajar yang menyamar.*
