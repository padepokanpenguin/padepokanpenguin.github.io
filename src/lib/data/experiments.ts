export interface Experiment {
	id: string;
	title: string;
	tag: string;
	description: string;
	interactionHint: string;
}

export const experiments: Experiment[] = [
	{
		id: 'lantern-switch',
		title: 'Lentera Taktil & Tali Fisika Verlet',
		tag: 'SVG Flame & Verlet Physics',
		description: 'Simulasi lentera minyak dan tali saklar berbasis integrasi Verlet (60 FPS constraint relaxation) dengan nyala api dinamis, efek asap saat padam, dan pergantian tema instan.',
		interactionHint: 'Tarik tali saklar atau ketuk lentera di sudut kanan atas untuk menyalakan/memadamkan api'
	},
	{
		id: 'penguin-mascot',
		title: 'Spring-Driven Penguin Mascot',
		tag: 'Svelte 5 Motion',
		description: 'Maskot vektor SVG interaktif yang melacak pergerakan kursor secara luwes dengan animasi pegas squash-and-stretch saat diklik.',
		interactionHint: 'Arahkan kursor atau klik maskot penguin di meja kerja'
	},
	{
		id: 'synth-audio',
		title: 'Procedural Web Audio Haptics',
		tag: 'Web Audio API Synthesis',
		description: 'Generator efek suara mikro-taktil waktu nyata menggunakan oscillator dan low-pass filter Web Audio API. Menghasilkan bunyi klik saklar dan lembaran buku tanpa satu pun file MP3 eksternal.',
		interactionHint: 'Nyalakan suara dan dengarkan efek akustik saat membuka buku atau menarik saklar'
	},
	{
		id: 'scribble-ink',
		title: 'Dynamic Hand-Drawn Marker',
		tag: 'SVG Path Animation',
		description: 'Animasi garis bawah bergaya goresan spidol tangan yang digambar secara dinamis mengikuti lebar elemen teks saat kursor diarahkan.',
		interactionHint: 'Arahkan kursor (hover) ke judul proyek atau tautan di dalam buku catatan'
	}
];