# 🧑🏾‍💻 arianurjamal - Blog & Portfolio Pribadi

[![Hugo](https://img.shields.io/badge/Hugo-0.123.0-FF4088?style=flat&logo=hugo)](https://gohugo.io/)
[![PaperMod](https://img.shields.io/badge/Theme-PaperMod-blue)](https://github.com/adityatelange/hugo-PaperMod)
[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-brightgreen)](https://padepokanpenguin.github.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> Website blog dan portfolio pribadi yang modern dan responsif, dibangun dengan Hugo dan dilengkapi dengan chatbot AI.

🌐 **Situs Live:** [https://padepokanpenguin.github.io/](https://padepokanpenguin.github.io/)

## ✨ Fitur

- 📝 **Artikel Blog** - Tulisan teknis dan wawasan pribadi
- 🎨 **Desain Bersih** - Tema PaperMod minimalis dengan mode gelap/terang
- 🤖 **Chatbot AI** - Asisten AI Gemini terintegrasi untuk interaksi pengunjung
- 📱 **Responsif Mobile** - Dioptimalkan untuk semua ukuran perangkat
- 🚀 **Performa Cepat** - Generasi situs statis dengan Hugo
- 🔍 **SEO Optimized** - Meta tags, Open Graph, dan structured data
- 🔄 **Auto Deploy** - GitHub Actions sebagai CI/CD untuk deployment

## 🛠️ Stack Teknologi

- **Static Site Generator:** [Hugo](https://gohugo.io/) v0.123.0
- **Tema:** [PaperMod](https://github.com/adityatelange/hugo-PaperMod)
- **Integrasi AI:** [Google Gemini API](https://ai.google.dev/)
- **Deployment:** GitHub Pages dengan GitHub Actions
- **Styling:** CSS dengan kustomisasi tema

## 🚀 Memulai

### Prasyarat

- [Hugo Extended](https://gohugo.io/installation/) v0.112.4+
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (untuk proxy server chatbot, opsional)

### Development Lokal

1. **Clone repository**
   ```bash
   git clone https://github.com/padepokanpenguin/padepokanpenguin.github.io.git
   cd padepokanpenguin.github.io
   ```

2. **Inisialisasi submodules**
   ```bash
   git submodule update --init --recursive
   ```

3. **Jalankan server development**
   ```bash
   hugo server -D
   ```

4. **Buka browser**
   ```
   http://localhost:1313
   ```

## 🤖 Setup Chatbot

Situs ini dilengkapi dengan chatbot AI menggunakan Google Gemini API. Untuk keamanan, API key disimpan di GitHub Secrets.

### Mengatur Chatbot

1. **Dapatkan Gemini API Key**
   - Kunjungi [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Buat API key baru

2. **Tambahkan GitHub Secret**
   - Pergi ke pengaturan repository
   - Navigasi ke `Secrets and variables` → `Actions`
   - Tambahkan secret baru:
     - **Name:** `GEMINI_API_KEY`
     - **Value:** API key Gemini Anda

3. **Deploy**
   - Chatbot akan otomatis bekerja setelah deployment berikutnya

Untuk instruksi setup detail, lihat [CHATBOT_SETUP.md](CHATBOT_SETUP.md).

## 📁 Struktur Proyek

```
.
├── .github/
│   └── workflows/
│       └── hugo.yaml              # GitHub Actions deployment
├── archetypes/
│   └── default.md                 # Template konten
├── content/
│   ├── about.md                   # Halaman tentang
│   ├── portfolio.md               # Halaman portfolio
│   └── blog/                      # Artikel blog
│       ├── computational-thinking-bukan-hanyak-untuk-anak-it.md
│       ├── debugging-github-pages-deployment-a-developer-journey.md
│       ├── deploy-hugo-dengan-github-action-pada-github-pages.md
│       ├── membangun-gemini-flash-api-menggunakan-node-js.md
│       └── problem-solving-skill.md
├── layouts/
│   └── partials/
│       ├── extend_head.html       # Konten head kustom
│       └── extend_footer.html     # Konten footer kustom
├── static/
│   ├── css/
│   │   └── chatbot.css           # Styling chatbot
│   ├── js/
│   │   └── chatbot.js            # Fungsi chatbot
│   └── assets/
│       └── images/               # Gambar situs
├── themes/
│   └── PaperMod/                 # Tema Hugo (submodule)
├── config.yml                    # Konfigurasi Hugo
├── example-proxy-server.js       # Server proxy opsional
└── README.md                     # File ini
```

## 📝 Manajemen Konten

### Membuat Artikel Blog Baru

1. **Buat post baru**
   ```bash
   hugo new blog/artikel-baru.md
   ```

2. **Edit front matter**
   ```yaml
   ---
   title: "Artikel Baru Saya"
   date: 2025-01-01T00:00:00+07:00
   draft: false
   tags: ["tag1", "tag2"]
   categories: ["kategori"]
   description: "Deskripsi artikel"
   ---
   ```

3. **Tulis konten** dalam format Markdown

4. **Preview lokal**
   ```bash
   hugo server -D
   ```

### Front Matter yang Didukung

- `title` - Judul artikel
- `date` - Tanggal publikasi
- `draft` - Status draft (true/false)
- `tags` - Array tag
- `categories` - Array kategori
- `description` - Meta description
- `author` - Nama penulis
- `ShowReadingTime` - Tampilkan estimasi waktu baca
- `ShowWordCount` - Tampilkan jumlah kata

## 🎨 Kustomisasi

### Konfigurasi Tema

Situs menggunakan tema PaperMod dengan konfigurasi kustom di `config.yml`:

- **Mode Gelap/Terang:** Auto-switching berdasarkan preferensi sistem
- **Ikon Sosial:** GitHub, LinkedIn, Twitter, Medium, Telegram, Upwork
- **Fitur:** Waktu baca, tombol share, breadcrumbs, tombol copy kode
- **Analytics:** Integrasi Google Analytics dan GoatCounter

### Kustomisasi Chatbot

Edit `static/css/chatbot.css` dan `static/js/chatbot.js` untuk mengkustomisasi:

- **Tampilan:** Warna, animasi, posisi
- **Perilaku:** Pesan selamat datang, riwayat percakapan
- **Integrasi:** Setup proxy server untuk keamanan yang lebih baik

## 🚀 Deployment

Situs otomatis di-deploy ke GitHub Pages menggunakan GitHub Actions ketika perubahan di-push ke branch `master`.

### Manual Deployment

1. **Build situs**
   ```bash
   hugo --gc --minify
   ```

2. **Deploy ke GitHub Pages**
   - Folder `public/` berisi situs yang telah di-generate
   - GitHub Actions menangani deployment otomatis

### Environment Variables

- `GEMINI_API_KEY` - API key Gemini (GitHub Secret)
- `HUGO_ENVIRONMENT` - Set ke `production` untuk optimasi

## 📊 Analytics & Monitoring

- **Google Analytics:** Dikonfigurasi dengan ID `G-X60YCVVTT6`
- **GoatCounter:** Analytics alternatif dengan kode situs `padepokanpenguin`
- **Performance:** Monitoring skor Lighthouse dan Core Web Vitals

## 🤝 Kontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/fitur-amazing`)
3. Commit perubahan (`git commit -m 'Tambah fitur amazing'`)
4. Push ke branch (`git push origin feature/fitur-amazing`)
5. Buka Pull Request

## 📖 Dokumentasi

- [Panduan Setup Chatbot](CHATBOT_SETUP.md) - Konfigurasi chatbot detail
- [Setup GitHub Secrets](GITHUB_SECRETS_SETUP.md) - Konfigurasi keamanan
- [Panduan Testing](TESTING_GUIDE.md) - Prosedur testing
- [Dokumentasi Hugo](https://gohugo.io/documentation/) - Dokumentasi framework Hugo
- [Dokumentasi PaperMod](https://github.com/adityatelange/hugo-PaperMod/wiki) - Dokumentasi tema

## 🐛 Troubleshooting

### Masalah Umum

**Chatbot tidak bekerja:**
- Verifikasi secret `GEMINI_API_KEY` sudah diset
- Cek log GitHub Actions untuk error deployment
- Pastikan API key memiliki izin yang tepat

**Build gagal:**
- Cek kompatibilitas versi Hugo
- Verifikasi inisialisasi submodule
- Review log workflow GitHub Actions

**Masalah tema:**
- Update submodule PaperMod: `git submodule update --remote`
- Cek konfigurasi tema di `config.yml`

### Mendapatkan Bantuan

- 📧 [Kontak via Telegram](https://t.me/kalang_kabut)
- 💼 [LinkedIn](https://www.linkedin.com/in/aria-nur-jamal-ba5856231/)
- 🐙 [GitHub Issues](https://github.com/padepokanpenguin/padepokanpenguin.github.io/issues)

## 📄 Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 👨‍💻 Penulis

**Aria Nur Jamal**
- 🌐 Website: [padepokanpenguin.github.io](https://padepokanpenguin.github.io/)
- 🐙 GitHub: [@padepokanpenguin](https://github.com/padepokanpenguin)
- 💼 LinkedIn: [aria-nur-jamal](https://www.linkedin.com/in/aria-nur-jamal-ba5856231/)
- 🐦 Twitter: [@aria_nur_jamal](https://twitter.com/aria_nur_jamal)
- 📝 Medium: [@tripletwinsco](https://tripletwinsco.medium.com/)

## 🙏 Penghargaan

- [Hugo](https://gohugo.io/) - Framework tercepat di dunia untuk membangun website
- [PaperMod](https://github.com/adityatelange/hugo-PaperMod) - Tema Hugo yang indah, cepat, dan minimal
- [Google Gemini](https://ai.google.dev/) - API AI untuk fungsi chatbot
- [GitHub Pages](https://pages.github.com/) - Hosting gratis untuk situs statis
- Komunitas open-source untuk inspirasi dan tools

## 🌐 Baca dalam Bahasa Lain

- [🇺🇸 English](README.md)
- [🇮🇩 Bahasa Indonesia](README.id.md)

---

<div align="center">

**Dibuat dengan ❤️ menggunakan Hugo**

[⬆ Kembali ke atas](#-arianurjamal---blog--portfolio-pribadi)

</div>
