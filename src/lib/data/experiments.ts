export interface Experiment {
	id: string;
	title: string;
	tag: string;
	description: string;
	interactionHint: string;
}

export const experiments: Experiment[] = [
	{
		id: 'pull-cord',
		title: 'Verlet Pull-Cord Light Switch',
		tag: 'Physics / Canvas',
		description: 'Simulasi tali 8-titik Verlet berbobot dengan gaya pegas balik dan pelatuk perubahan tema.',
		interactionHint: 'Tarik tali di pojok kanan atas layar melebihi 65px'
	},
	{
		id: 'penguin-mascot',
		title: 'Spring-Driven Penguin Mascot',
		tag: 'Svelte 5 Motion',
		description: 'Maskot vektor SVG interaktif yang melacak kursor secara luwes dengan respons squash-stretch saat diklik.',
		interactionHint: 'Gerakkan mouse atau klik maskot penguin'
	},
	{
		id: 'synth-audio',
		title: 'Procedural Audio Synthesizer',
		tag: 'Web Audio API',
		description: 'Sintesis frekuensi audio realtime tanpa file eksternal untuk bunyi klik saklar dan halaman buku.',
		interactionHint: 'Dengarkan suara saat berinteraksi dengan komponen'
	},
	{
		id: 'scribble-ink',
		title: 'SVG Hand-Drawn Marker Underlines',
		tag: 'SVG in:draw',
		description: 'Garis bawah spidol kalkulasi otomatis yang digambar secara presisi saat kursor hover.',
		interactionHint: 'Arahkan mouse ke judul proyek pada buku portofolio'
	}
];
