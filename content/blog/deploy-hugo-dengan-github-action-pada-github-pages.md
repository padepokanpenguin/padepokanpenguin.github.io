+++
title = 'Deploy Hugo Dengan Github Action Pada Github Pages'
date = 2024-02-11T21:49:41+07:00
draft = false
author = "Aria Nur Jamal"
categories = ["Tutorial"]
tags = ["Go", "Hugo", "Blog"]
ShowWordCounr = false
+++

### Pembukaan

Personal blog adalah salah wadah bagi seseorang untuk mencurahkan karyanya, bahkan kita bisa menjadikan personal blog tersebut menjadi portfolio kita atau menyimpan hal-hal yang sudah kita pelajari sehingga bisa menjadi pengingat bagi kita. Di zaman yang modern ini banyak sekali platform yang bisa digunakan untuk membuat blog dari yang berbayar sampai gratis. Dan salah satu dari platform tersebut adalah hugo. Pada kesempatan kali kita akan membahas bagaimana cara membuat personal blog menggunakan hugo hingga melakukan deployment dengan github action pada github pages. Penulis ingin mengingatkan, semua hal yang kita lakukan ini gratis loh tanpa biaya apapun dan kita bisa melakukannya hanya beberapa menit😉.

### Pengenalan Hugo dan Kelebihannya

Hugo adalah suatu framework yang ditulis menggunakan bahasa GO. Di dalam website official Hugo, ditulis bahwa Hugo adalah framework yang memiliki tujuan umum tidak terfokus pada suatu objektif saja seperti portfolio, blogging dan lain-lain. Hugo juga merupakan static site generator yang mana halaman-halaman dari website yang terdapat pada Hugo itu dibuat ketika kita membuat atau mengupdate konten, ketika user mengunjungi route halaman website kita, maka hugo tidak membuat ulang halaman tersebut karena sudah tersedia ketika kita membuat atau mengupdate konten pada halaman tersebut.

Kelebihan Hugo:
1. Hugo memiliki waktu build yang sangat cepat
2. Hugo dapat dikembangkan di berbagai platform seperti Linux, MacOs dan windows. (Penulis sudah mengguanakan dua operating system untuk mengembangkan website ini)
3. Memiliki banyak tema
4. Dapat di hosting di manapun. 
5. Dan masih banyak lagi.

### Proses Instalasi

Untuk melakukan instalasi Hugo, kalian dapat melihat cara instalasi yang sesuai dengan OS yang kalian gunakan di website resmi Hugo atau klik [link](https://gohugo.io/installation/). Sebelum mendownload Hugo, kalian harus melakukan download dan instalasi dependency yang dibutuhkan oleh hugo, untu mengetahui dependency yang dibutuhkan anda dapat melihatnya di hyperlink sebelumnya.

Setelah anda selesai melakukan instalasi Hugo, langkah selanjut nya adalah dengan membuat website yang akan anda buat.

```bash
hugo new site namaWebsite
```

```bash
Congratulations! Your new Hugo site was created in D:\Programming\hugo\example.

Just a few more steps...

1. Change the current directory to D:\Programming\hugo\example.
2. Create or install a theme:
   - Create a new theme with the command "hugo new theme <THEMENAME>"
   - Install a theme from https://themes.gohugo.io/
3. Edit hugo.toml, setting the "theme" property to the theme name.
4. Create new content with the command "hugo new content <SECTIONNAME>\<FILENAME>.<FORMAT>".
5. Start the embedded web server with the command "hugo server --buildDrafts".

See documentation at https://gohugo.io/.
```

Setelah selesai melakukan instalasi, kalian dapat melihat tema yang akan kalian gunakan. Unutk melihat tema yang tersedia kalian dapat melihat di [link ini](https://themes.gohugo.io/). Untuk tema yang saya gunakan adalah [PaperMod](https://github.com/adityatelange/hugo-PaperMod) (kalian bebas menggunakan tema lainnya).

catatan: Untuk menggunakan tema kalian harus menginstall nya dan melakukan beberapa konfigurasi agar tema yang kalian gunakan dapat berjalan dengan baik.

Berikut adalah konfigurasi yang saya gunakan untuk pengaturan tema paperMod:
```
baseURL: "https://example.com"
title: example
theme: ["PaperMod"]

enableRobotsTXT: true
buildDrafts: false
buildFuture: false
buildExpired: false

googleAnalytics: YOUR-GOOGLE-ANALYTICS-CODE

params:
  env: production # to enable google analytics, opengraph, twitter-cards and schema.
  title: arianurjamal
  description: "Full Snack Developer"
  keywords: [Blog, Portfolio, PaperMod]
  author: Aria Nur Jamal
  # author: ["Me", "You"] # multiple authors
  images: ["<link or path of image for opengraph, twitter-cards>"]
  DateFormat: "January 2, 2006"
  defaultTheme: auto # dark, light
  disableThemeToggle: false

  ShowReadingTime: true
  ShowShareButtons: true
  ShowPostNavLinks: true
  ShowBreadCrumbs: true
  ShowCodeCopyButtons: true
  goatcounter: padepokanpenguin
    #ShowWordCount: true
  ShowRssButtonInSectionTermList: true
  UseHugoToc: true
  disableSpecial1stPost: false
  disableScrollToTop: false
  comments: false
  hidemeta: false
  hideSummary: false
  showtoc: false
  tocopen: false

  homeInfoParams:
    Title: "Personal Blog"
    Content: >
      🧑🏾‍💻 **Full Snack Developer**

      - I'm eating for life but my life was not only for eating
  
  socialIcons:
    - name: github
      title: Follow me on Github
      url: "https://github.com/padepokanpenguin/"
    - name: linkedin
      title: Connect with me in linkedin
      url: "https://discord.gg/ahpmTvhVmp"
    - name: X
      title: Share PapeirMod on X/Twitter
      url: "https://twitter.com/aria_nur_jamal"
    - name: medium
      title: Read my other articles in medium
      url: "https://tripletwinsco.medium.com/"
    - name: telegram
      title: Contact me on telegram
      url: "https://t.me/kalang_kabut"

menu:
  main:
    - identifier: home
      name: Home
      url: /
      weight: 1
    - identifier: portfolio
      name: Portfolio
      url: /portfolio/
      weight: 20
    - identifier: tags
      name: Tags
      url: /tags/
      weight: 10
    - identifier: about
      name: About
      url: /about/
      weight: 30

```
Setelah itu cobalah run hugo menggunakan command:

```bash
hugo serve
```

```bash
Watching for changes in D:\your-hugo-directory\
{archetypes,assets,content,data,i18n,layouts,static,themes}
Watching for config changes in D:\D:\your-hugo-directory\config.yml
Start building sites … 
hugo v0.123.0-3c8a4713908e48e6523f058ca126710397aa4ed5+extended windows/amd64 BuildDate=2024-02-19T16:32:38Z VendorInfo=gohugoio


                   | EN  
-------------------+-----
  Pages            | 27  
  Paginator pages  |  0  
  Non-page files   |  0  
  Static files     |  0  
  Processed images |  0
  Aliases          |  8
  Cleaned          |  0

Built in 233 ms
Environment: "development"
Serving pages from disk
Running in Fast Render Mode. For full rebuilds on change: hugo server --disableFastRender
Web Server is available at http://localhost:1313/ (bind address 127.0.0.1) 
Press Ctrl+C to stop
```

Dan bukalah ```http://localhost:1313/``` di browser anda, maka kurang lebih akan tampil seperti ini.

![Image Alt Text](/assets/images/hugo-1.png)

## Deploy hugo menggunakan Github Pages
Untuk melakukan kustomisasi pada hugo, kalian dapat mengubah konfigurasinya pada file config.yml

```yaml
baseURL: "https://padepokanpenguin.github.io/" #value baseUrl harus dimulai dengan http procotol dan diakhiri dengan garis miring seperti contoh ini.
title: arianurjamal
theme: ["PaperMod"]
```

Dan buatlah repostiory dengan format ```yoursitename.github.io``` setelah itu push hugo yang akan anda deploy pada repo tersebut. Dan buatlah file ```.github/workflows/hugo.yml``` yang nantinya akan menjadi github action dan melakukan deploy setiap kali ada commit pada repository anda.

```yaml
# Sample workflow for building and deploying a Hugo site to GitHub Pages
name: Deploy Hugo site to Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches:
      - master

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: "pages"
  cancel-in-progress: false

# Default to bash
defaults:
  run:
    shell: bash

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.122.0
    steps:
      - name: Install Hugo CLI
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \
          && sudo dpkg -i ${{ runner.temp }}/hugo.deb          
      - name: Checkout
        uses: actions/checkout@v4
        with:
          token: ${{ secrets.ACCESS_TOKEN }}
          submodules: true
          fetch-depth: 0
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v4
      - name: Build with Hugo
        env:
          # For maximum backward compatibility with Hugo modules
          HUGO_ENVIRONMENT: production
          HUGO_ENV: production
        run: |
          hugo \
            --gc \
            --minify \
            --baseURL "${{ steps.pages.outputs.base_url }}/"          
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./public

  # Deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v3
```

untuk variable secrets.ACCESS_TOKEN dapat anda dapatkan dari Personal Access Token (PAT) degan cara:

1. Pergi Ke setting pada akun github kalian
2. Setelah itu pilih tab developer settings
3. Dan klik Personal Access Token dan pilih Tokens classic.

Setelah berhasil mendapatkan PAT tambahkan PAT tersebut pada repository sebelumnya dengan cara:

1. Pilih tab setting pada repository
2. Klik secrets dan pilih actions
3. Klik tombol New repository secret
4. isi nama dengan  ACCESS_TOKEN dan secret menggunakan PAT yang didapatkan sebelumnya.

### Kesimpulan
Setiap commit yang anda buat pada branch master maka akan memicu pipeline dan melakukan deploy website kalian. Kalian juga dapat melalukan branching pada repository kalian agar lebih rapi.