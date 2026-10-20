export type SupportedLanguage = 'javascript' | 'typescript' | 'python';

export interface LanguageInfo {
	id: SupportedLanguage;
	name: string;
	ext: string;
	badge: string;
	icon: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
	{ id: 'javascript', name: 'JavaScript', ext: '.js', badge: 'ES6+', icon: '🟨' },
	{ id: 'typescript', name: 'TypeScript', ext: '.ts', badge: 'TS 5.x', icon: '🔷' },
	{ id: 'python', name: 'Python', ext: '.py', badge: 'Py 3.12', icon: '🐍' }
];

export interface TestCase {
	input: string;
	expected: string;
	label: string;
}

export interface Challenge {
	id: string;
	title: string;
	difficulty: 'Pemula' | 'Menengah' | 'Lanjutan';
	category: 'Array 1D' | 'Array 2D' | 'Array 3D';
	emoji: string;
	story: string;
	task: string;
	starterCode: string;
	starterCodes: Record<SupportedLanguage, string>;
	testCases: TestCase[];
	hints: string[];
}

export const challenges: Challenge[] = [
	// ──────────────── ARRAY 1D ────────────────
	{
		id: 'warung-pak-budi',
		title: 'Persediaan Warung Pak Budi',
		difficulty: 'Pemula',
		category: 'Array 1D',
		emoji: '🏪',
		story: `Pak Budi punya warung kelontong kecil di pinggir jalan. Setiap pagi, dia mencatat jumlah stok barang dagangannya ke dalam sebuah daftar (array). Sayangnya, beberapa barang sudah habis (bernilai 0) dan ada juga yang hampir habis (bernilai kurang dari 3).

Hari ini distributor datang dan bertanya: "Pak Budi, berapa total stok yang masih ada? Dan barang mana saja yang perlu di-restock?"

Bantu Pak Budi mengolah data persediaan warungnya!`,
		task: `Diberikan array \`stok\` berisi angka jumlah stok tiap barang.

Kembalikan sebuah **object** dengan properti:
- \`totalStok\`: jumlah seluruh stok (sum semua elemen)
- \`perluRestock\`: array berisi **index** barang yang stoknya kurang dari 3 (termasuk 0)
- \`stokBersih\`: array baru yang hanya berisi barang dengan stok > 0 (hapus yang habis)`,
		starterCode: `function olahPersediaan(stok) {
  // totalStok: jumlah semua elemen di array stok
  // perluRestock: index barang dengan stok < 3
  // stokBersih: filter barang yang stoknya > 0

  return {
    totalStok: 0,
    perluRestock: [],
    stokBersih: []
  };
}`,
		starterCodes: {
			javascript: `function olahPersediaan(stok) {
  // totalStok: jumlah semua elemen di array stok
  // perluRestock: index barang dengan stok < 3
  // stokBersih: filter barang yang stoknya > 0

  return {
    totalStok: 0,
    perluRestock: [],
    stokBersih: []
  };
}`,
			typescript: `interface HasilPersediaan {
  totalStok: number;
  perluRestock: number[];
  stokBersih: number[];
}

function olahPersediaan(stok: number[]): HasilPersediaan {
  // totalStok: jumlah semua elemen di array stok
  // perluRestock: index barang dengan stok < 3
  // stokBersih: filter barang yang stoknya > 0

  return {
    totalStok: 0,
    perluRestock: [],
    stokBersih: []
  };
}`,
			python: `def olah_persediaan(stok: list) -> dict:
    # totalStok: jumlah semua elemen di array stok
    # perluRestock: index barang dengan stok < 3
    # stokBersih: filter barang yang stoknya > 0

    return {
        "totalStok": 0,
        "perluRestock": [],
        "stokBersih": []
    }
`
		},
		testCases: [
			{
				input: '[5, 0, 12, 2, 0, 8, 1]',
				expected: '{"totalStok":28,"perluRestock":[1,3,4,6],"stokBersih":[5,12,2,8,1]}',
				label: 'Stok campuran dengan beberapa barang habis'
			},
			{
				input: '[0, 0, 0]',
				expected: '{"totalStok":0,"perluRestock":[0,1,2],"stokBersih":[]}',
				label: 'Semua barang habis'
			},
			{
				input: '[10, 20, 30]',
				expected: '{"totalStok":60,"perluRestock":[],"stokBersih":[10,20,30]}',
				label: 'Tidak ada yang perlu restock'
			}
		],
		hints: [
			'Gunakan .reduce() (JS/TS) atau sum() (Python) untuk menjumlahkan seluruh elemen array',
			'Loop sambil cek index — simpan index yang nilainya < 3',
			'Gunakan .filter(item => item > 0) (JS/TS) atau list comprehension [s for s in stok if s > 0] (Python) untuk menyaring barang yang masih ada stoknya'
		]
	},
	{
		id: 'antrian-konser',
		title: 'Antrian Tiket Konser',
		difficulty: 'Pemula',
		category: 'Array 1D',
		emoji: '🎫',
		story: `Malam ini konser band legendaris "Penguin Rock" di stadion kota. Ribuan fans mengantri dari subuh. Panitia mencatat nama setiap orang yang mengantri ke dalam sebuah array.

Tapi ada masalah: beberapa orang menyerobot antrian, ada yang mengundurkan diri, dan panitia perlu tahu siapa yang dapat tiket VIP (3 orang pertama di antrian).

Kamu ditugaskan membangun sistem manajemen antrian ini!`,
		task: `Diberikan array \`antrian\` berisi nama-nama orang, dan array \`aksi\` berisi perintah.

Setiap aksi adalah string dengan format:
- \`"MASUK:Nama"\` → tambahkan Nama ke **belakang** antrian
- \`"KELUAR"\` → keluarkan orang **paling depan** dari antrian
- \`"SEROBOT:Nama"\` → sisipkan Nama ke posisi **kedua** (index 1), atau paling depan jika antrian kosong

Proses semua aksi secara berurutan, lalu kembalikan object:
- \`antrian\`: array antrian akhir
- \`vip\`: 3 orang pertama dari antrian akhir (atau kurang jika antrian < 3)
- \`terlayani\`: jumlah orang yang sudah keluar dari antrian`,
		starterCode: `function kelolAntrian(antrian, aksi) {
  let terlayani = 0;

  for (const a of aksi) {
    // Parse aksi dan lakukan operasi pada array antrian
    // MASUK:Nama → push ke belakang
    // KELUAR → shift dari depan, tambah counter terlayani
    // SEROBOT:Nama → splice ke index 1
  }

  return {
    antrian: [],
    vip: [],
    terlayani: 0
  };
}`,
		starterCodes: {
			javascript: `function kelolAntrian(antrian, aksi) {
  let terlayani = 0;

  for (const a of aksi) {
    // Parse aksi dan lakukan operasi pada array antrian
    // MASUK:Nama → push ke belakang
    // KELUAR → shift dari depan, tambah counter terlayani
    // SEROBOT:Nama → splice ke index 1
  }

  return {
    antrian: [],
    vip: [],
    terlayani: 0
  };
}`,
			typescript: `interface HasilAntrian {
  antrian: string[];
  vip: string[];
  terlayani: number;
}

function kelolAntrian(antrian: string[], aksi: string[]): HasilAntrian {
  let terlayani = 0;

  for (const a of aksi) {
    // Proses setiap aksi
  }

  return {
    antrian: [],
    vip: [],
    terlayani: 0
  };
}`,
			python: `def kelol_antrian(antrian: list, aksi: list) -> dict:
    terlayani = 0

    for a in aksi:
        # MASUK:Nama -> append ke belakang
        # KELUAR -> pop(0) dari depan, tambah terlayani
        # SEROBOT:Nama -> insert(1, nama)
        pass

    return {
        "antrian": [],
        "vip": [],
        "terlayani": 0
    }
`
		},
		testCases: [
			{
				input: '["Andi","Budi","Cici"],["MASUK:Dedi","KELUAR","SEROBOT:Eve"]',
				expected: '{"antrian":["Budi","Eve","Cici","Dedi"],"vip":["Budi","Eve","Cici"],"terlayani":1}',
				label: 'Kombinasi masuk, keluar, dan serobot'
			},
			{
				input: '[],["MASUK:Andi","MASUK:Budi","KELUAR","KELUAR","KELUAR"]',
				expected: '{"antrian":[],"vip":[],"terlayani":2}',
				label: 'Antrian kosong lalu diisi lalu dikosongkan'
			},
			{
				input: '["Ali","Baba"],["SEROBOT:Coki","SEROBOT:Doni"]',
				expected: '{"antrian":["Ali","Doni","Coki","Baba"],"vip":["Ali","Doni","Coki"],"terlayani":0}',
				label: 'Dua orang menyerobot berturutan'
			}
		],
		hints: [
			'Gunakan split(":") untuk memisahkan jenis aksi dan nama',
			'shift() di JS/TS atau pop(0) di Python untuk menghapus elemen pertama',
			'splice(1, 0, nama) di JS/TS atau insert(1, nama) di Python untuk menyisipkan ke index 1',
			'Gunakan slice(0, 3) di JS/TS atau [:3] di Python untuk mengambil 3 orang VIP pertama'
		]
	},

	// ──────────────── ARRAY 2D ────────────────
	{
		id: 'peta-harta-karun',
		title: 'Peta Harta Karun Bajak Laut',
		difficulty: 'Menengah',
		category: 'Array 2D',
		emoji: '🗺️',
		story: `Kapten Penguin menemukan peta harta karun kuno yang berbentuk grid 2 dimensi. Setiap sel di peta berisi angka:
- \`0\` = laut (tidak bisa dilewati)
- \`1\` = daratan (bisa dilewati)  
- \`9\` = harta karun!

Kapten perlu tahu berapa total harta karun yang ada di peta, di baris mana saja harta itu berada, dan apakah ada harta yang "terisolasi" (dikelilingi laut di atas, bawah, kiri, kanan).`,
		task: `Diberikan array 2D \`peta\` berisi angka 0, 1, dan 9.

Kembalikan object:
- \`totalHarta\`: jumlah sel bernilai 9
- \`barisHarta\`: array berisi nomor baris (index) yang mengandung harta (tanpa duplikat, urut naik)
- \`hartaTerisolasi\`: jumlah harta yang semua tetangganya (atas, bawah, kiri, kanan) bernilai 0 atau berada di luar batas peta`,
		starterCode: `function analisisPeta(peta) {
  let totalHarta = 0;
  const barisHarta = [];
  let hartaTerisolasi = 0;

  // Loop setiap baris dan kolom
  // Cek nilai 9 → tambah totalHarta, catat baris
  // Untuk tiap harta, cek 4 arah tetangga

  return {
    totalHarta,
    barisHarta,
    hartaTerisolasi
  };
}`,
		starterCodes: {
			javascript: `function analisisPeta(peta) {
  let totalHarta = 0;
  const barisHarta = [];
  let hartaTerisolasi = 0;

  // Loop setiap baris dan kolom
  // Cek nilai 9 → tambah totalHarta, catat baris
  // Untuk tiap harta, cek 4 arah tetangga

  return {
    totalHarta,
    barisHarta,
    hartaTerisolasi
  };
}`,
			typescript: `interface HasilPeta {
  totalHarta: number;
  barisHarta: number[];
  hartaTerisolasi: number;
}

function analisisPeta(peta: number[][]): HasilPeta {
  let totalHarta = 0;
  const barisHarta: number[] = [];
  let hartaTerisolasi = 0;

  return {
    totalHarta,
    barisHarta,
    hartaTerisolasi
  };
}`,
			python: `def analisis_peta(peta: list) -> dict:
    totalHarta = 0
    barisHarta = []
    hartaTerisolasi = 0

    # Loop setiap baris & kolom
    # Cek nilai 9 dan periksa tetangga di 4 arah

    return {
        "totalHarta": totalHarta,
        "barisHarta": barisHarta,
        "hartaTerisolasi": hartaTerisolasi
    }
`
		},
		testCases: [
			{
				input: '[[0,1,0],[1,9,1],[0,1,9]]',
				expected: '{"totalHarta":2,"barisHarta":[1,2],"hartaTerisolasi":0}',
				label: 'Dua harta, tidak ada yang terisolasi'
			},
			{
				input: '[[0,0,0],[0,9,0],[0,0,0]]',
				expected: '{"totalHarta":1,"barisHarta":[1],"hartaTerisolasi":1}',
				label: 'Satu harta terisolasi di tengah lautan'
			},
			{
				input: '[[9,0,9],[0,0,0],[9,0,9]]',
				expected: '{"totalHarta":4,"barisHarta":[0,2],"hartaTerisolasi":4}',
				label: 'Empat harta di sudut — semua terisolasi'
			}
		],
		hints: [
			'Gunakan nested loop untuk iterasi baris (r) dan kolom (c)',
			'Definisikan arah tetangga: [[-1,0],[1,0],[0,-1],[0,1]]',
			'Tetangga di luar batas grid dianggap bernilai 0 (laut)',
			'Pastikan barisHarta tidak menyimpan duplikat baris'
		]
	},
	{
		id: 'denah-bioskop',
		title: 'Denah Kursi Bioskop',
		difficulty: 'Menengah',
		category: 'Array 2D',
		emoji: '🎬',
		story: `Bioskop "Cinema Penguin" baru saja direnovasi. Manajer perlu sistem untuk mengelola denah tempat duduk. Denah disimpan sebagai array 2D di mana:
- \`0\` = kursi kosong
- \`1\` = kursi sudah dipesan
- \`2\` = kursi rusak (tidak bisa dipesan)

Sekelompok teman ingin nonton bareng dan butuh kursi yang bersebelahan dalam satu baris. Manajer juga ingin tahu statistik ketersediaan kursi.`,
		task: `Diberikan array 2D \`denah\` dan angka \`jumlahTeman\`.

Kembalikan object:
- \`totalKosong\`: jumlah kursi kosong (bernilai 0) di seluruh bioskop
- \`barisRekomendasi\`: index baris **pertama** yang memiliki kursi kosong bersebelahan sebanyak \`jumlahTeman\`. Jika tidak ada, isi \`-1\`
- \`persentasiTerisi\`: persentase kursi terisi (nilai 1) dibagi total kursi yang bukan rusak (nilai 0 dan 1), dibulatkan ke bawah (floor) sebagai integer`,
		starterCode: `function kelolaBioskop(denah, jumlahTeman) {
  let totalKosong = 0;
  let barisRekomendasi = -1;
  let terisi = 0;
  let bukRusak = 0;

  // Iterasi setiap baris & kolom
  // Hitung totalKosong, terisi, bukRusak
  // Cari baris dengan kursi kosong berturutan >= jumlahTeman

  return {
    totalKosong,
    barisRekomendasi,
    persentasiTerisi: 0
  };
}`,
		starterCodes: {
			javascript: `function kelolaBioskop(denah, jumlahTeman) {
  let totalKosong = 0;
  let barisRekomendasi = -1;
  let terisi = 0;
  let bukRusak = 0;

  // Iterasi setiap baris & kolom
  // Hitung totalKosong, terisi, bukRusak
  // Cari baris dengan kursi kosong berturutan >= jumlahTeman

  return {
    totalKosong,
    barisRekomendasi,
    persentasiTerisi: 0
  };
}`,
			typescript: `interface HasilBioskop {
  totalKosong: number;
  barisRekomendasi: number;
  persentasiTerisi: number;
}

function kelolaBioskop(denah: number[][], jumlahTeman: number): HasilBioskop {
  let totalKosong = 0;
  let barisRekomendasi = -1;
  let terisi = 0;
  let bukRusak = 0;

  return {
    totalKosong,
    barisRekomendasi,
    persentasiTerisi: 0
  };
}`,
			python: `def kelola_bioskop(denah: list, jumlah_teman: int) -> dict:
    totalKosong = 0
    barisRekomendasi = -1
    persentasiTerisi = 0

    return {
        "totalKosong": totalKosong,
        "barisRekomendasi": barisRekomendasi,
        "persentasiTerisi": persentasiTerisi
    }
`
		},
		testCases: [
			{
				input: '[[1,0,0,0,1],[1,1,1,1,1],[0,0,2,0,0]],3',
				expected: '{"totalKosong":5,"barisRekomendasi":0,"persentasiTerisi":53}',
				label: '3 teman bisa duduk di baris pertama'
			},
			{
				input: '[[1,0,1,0,1],[0,1,0,1,0]],3',
				expected: '{"totalKosong":4,"barisRekomendasi":-1,"persentasiTerisi":60}',
				label: 'Tidak ada 3 kursi bersebelahan'
			},
			{
				input: '[[0,0,0],[0,0,0],[2,2,2]],2',
				expected: '{"totalKosong":6,"barisRekomendasi":0,"persentasiTerisi":0}',
				label: 'Baris terakhir semua rusak, baris awal semua kosong'
			}
		],
		hints: [
			'Gunakan penghitung kursi berturutan yang direset ke 0 saat bertemu selain 0',
			'Kursi rusak (nilai 2) tidak dihitung dalam persentase',
			'Math.floor() di JS/TS atau // di Python untuk pembagian bulat'
		]
	},

	// ──────────────── ARRAY 3D ────────────────
	{
		id: 'gedung-apartemen',
		title: 'Sensus Gedung Apartemen',
		difficulty: 'Lanjutan',
		category: 'Array 3D',
		emoji: '🏢',
		story: `Gedung apartemen "Menara Penguin" memiliki beberapa lantai, setiap lantai terdiri dari beberapa koridor, dan setiap koridor memiliki beberapa kamar. Data penghuni disimpan dalam array 3D:

\`gedung[lantai][koridor][kamar]\`

Setiap kamar berisi angka jumlah penghuni (0 berarti kamar kosong).

Pengelola gedung perlu laporan lengkap: total penghuni, lantai terpadat, dan daftar kamar kosong untuk ditawarkan ke calon penyewa baru.`,
		task: `Diberikan array 3D \`gedung\` dengan format \`gedung[lantai][koridor][kamar] = jumlahPenghuni\`.

Kembalikan object:
- \`totalPenghuni\`: jumlah seluruh penghuni di gedung
- \`lantaiTerpadat\`: index lantai dengan jumlah penghuni terbanyak (jika sama, ambil index terkecil)
- \`kamarKosong\`: array berisi string lokasi kamar kosong dengan format \`"L{lantai}-K{koridor}-R{kamar}"\` (gunakan index dimulai dari 0)`,
		starterCode: `function sensusGedung(gedung) {
  let totalPenghuni = 0;
  let lantaiTerpadat = 0;
  let maxPenghuni = -1;
  const kamarKosong = [];

  // Triple nested loop: lantai → koridor → kamar
  // Hitung total, cari lantai terpadat, catat kamar kosong

  return {
    totalPenghuni,
    lantaiTerpadat,
    kamarKosong
  };
}`,
		starterCodes: {
			javascript: `function sensusGedung(gedung) {
  let totalPenghuni = 0;
  let lantaiTerpadat = 0;
  let maxPenghuni = -1;
  const kamarKosong = [];

  // Triple nested loop: lantai → koridor → kamar
  // Hitung total, cari lantai terpadat, catat kamar kosong

  return {
    totalPenghuni,
    lantaiTerpadat,
    kamarKosong
  };
}`,
			typescript: `interface HasilGedung {
  totalPenghuni: number;
  lantaiTerpadat: number;
  kamarKosong: string[];
}

function sensusGedung(gedung: number[][][]): HasilGedung {
  let totalPenghuni = 0;
  let lantaiTerpadat = 0;
  let maxPenghuni = -1;
  const kamarKosong: string[] = [];

  return {
    totalPenghuni,
    lantaiTerpadat,
    kamarKosong
  };
}`,
			python: `def sensus_gedung(gedung: list) -> dict:
    totalPenghuni = 0
    lantaiTerpadat = 0
    maxPenghuni = -1
    kamarKosong = []

    # 3-level loop: lantai → koridor → kamar

    return {
        "totalPenghuni": totalPenghuni,
        "lantaiTerpadat": lantaiTerpadat,
        "kamarKosong": kamarKosong
    }
`
		},
		testCases: [
			{
				input: '[[[2,0],[1,3]],[[0,0],[4,1]],[[1,1],[0,2]]]',
				expected: '{"totalPenghuni":15,"lantaiTerpadat":1,"kamarKosong":["L0-K0-R1","L1-K0-R0","L1-K0-R1","L2-K1-R0"]}',
				label: '3 lantai, 2 koridor, 2 kamar'
			},
			{
				input: '[[[0,0],[0,0]]]',
				expected: '{"totalPenghuni":0,"lantaiTerpadat":0,"kamarKosong":["L0-K0-R0","L0-K0-R1","L0-K1-R0","L0-K1-R1"]}',
				label: 'Gedung kosong total'
			},
			{
				input: '[[[5]],[[3]],[[5]]]',
				expected: '{"totalPenghuni":13,"lantaiTerpadat":0,"kamarKosong":[]}',
				label: 'Semua terisi, dua lantai sama padat (ambil index terkecil)'
			}
		],
		hints: [
			'Gunakan 3 level loop: lantai, koridor, kamar',
			'Hitung total per lantai lalu bandingkan dengan maxPenghuni menggunakan operator >',
			'Format string lokasi: `L${l}-K${k}-R${r}` di JS/TS atau f"L{l}-K{k}-R{r}" di Python'
		]
	},
	{
		id: 'rak-perpustakaan',
		title: 'Inventaris Perpustakaan 3D',
		difficulty: 'Lanjutan',
		category: 'Array 3D',
		emoji: '📚',
		story: `Perpustakaan kota baru saja mengimplementasi sistem digital. Koleksi buku disimpan dalam array 3D yang merepresentasikan:

\`perpus[ruangan][rak][slot]\`

Setiap slot berisi string nama buku, atau \`"-"\` jika slot kosong. 

Kepala perpustakaan ingin melakukan audit: cari buku duplikat (muncul lebih dari satu kali di seluruh perpustakaan), hitung kapasitas terpakai, dan temukan ruangan dengan slot kosong terbanyak untuk penempatan buku baru.`,
		task: `Diberikan array 3D \`perpus\` dengan format \`perpus[ruangan][rak][slot] = namaBuku | "-"\`.

Kembalikan object:
- \`totalBuku\`: jumlah slot yang berisi buku (bukan \`"-"\`)
- \`duplikat\`: array nama buku yang muncul **lebih dari satu kali** di seluruh perpustakaan (urut abjad, tanpa duplikat di array hasil)
- \`ruanganKosong\`: index ruangan yang punya slot kosong (\`"-"\`) **terbanyak** (jika seri, ambil index terkecil)`,
		starterCode: `function auditPerpustakaan(perpus) {
  let totalBuku = 0;
  const hitungBuku = {};
  let ruanganKosong = 0;
  let maxKosong = -1;

  // Triple loop: ruangan → rak → slot
  // Hitung buku, catat frekuensi setiap judul, hitung slot kosong per ruangan

  return {
    totalBuku,
    duplikat: [],
    ruanganKosong
  };
}`,
		starterCodes: {
			javascript: `function auditPerpustakaan(perpus) {
  let totalBuku = 0;
  const hitungBuku = {};
  let ruanganKosong = 0;
  let maxKosong = -1;

  // Triple loop: ruangan → rak → slot
  // Hitung buku, catat frekuensi setiap judul, hitung slot kosong per ruangan

  return {
    totalBuku,
    duplikat: [],
    ruanganKosong
  };
}`,
			typescript: `interface HasilPerpus {
  totalBuku: number;
  duplikat: string[];
  ruanganKosong: number;
}

function auditPerpustakaan(perpus: string[][][]): HasilPerpus {
  let totalBuku = 0;
  const hitungBuku: Record<string, number> = {};
  let ruanganKosong = 0;
  let maxKosong = -1;

  return {
    totalBuku,
    duplikat: [],
    ruanganKosong
  };
}`,
			python: `def audit_perpustakaan(perpus: list) -> dict:
    totalBuku = 0
    hitungBuku = {}
    ruanganKosong = 0
    maxKosong = -1

    # Triple loop: ruangan → rak → slot

    return {
        "totalBuku": totalBuku,
        "duplikat": [],
        "ruanganKosong": ruanganKosong
    }
`
		},
		testCases: [
			{
				input: '[[["Fisika","Kimia"],["Fisika","-"]],[["Biologi","-"],["-","-"]]]',
				expected: '{"totalBuku":4,"duplikat":["Fisika"],"ruanganKosong":1}',
				label: 'Buku Fisika duplikat, ruangan 1 paling kosong'
			},
			{
				input: '[[["-","-"],["-","-"]],[["-","-"],["-","-"]]]',
				expected: '{"totalBuku":0,"duplikat":[],"ruanganKosong":0}',
				label: 'Perpustakaan kosong total'
			},
			{
				input: '[[["A","B"],["C","A"]],[["B","C"],["A","D"]]]',
				expected: '{"totalBuku":8,"duplikat":["A","B","C"],"ruanganKosong":0}',
				label: 'Banyak buku duplikat, tidak ada slot kosong → index 0'
			}
		],
		hints: [
			'Gunakan dictionary/object untuk menghitung frekuensi setiap judul buku',
			'Filter judul dengan frekuensi > 1 lalu sort alfabetis',
			'Hitung slot "-" per ruangan dan simpan ruangan dengan slot terbanyak'
		]
	}
];
