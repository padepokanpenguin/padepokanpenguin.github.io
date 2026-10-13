export interface Profile {
	name: string;
	title: string;
	handle: string;
	domain: string;
	bio: string;
	philosophy: string[];
	tags: string[];
	stats: {
		label: string;
		value: string;
	}[];
	socials: {
		label: string;
		url: string;
		icon: string;
	}[];
}

export const profile: Profile = {
	name: 'Padepokan Penguin',
	title: 'Creative Engineering & Systems Craft',
	handle: 'padepokanpenguin',
	domain: 'padepokanpenguin.github.io',
	bio: 'Tempat bertapa dan menempa kode. Menghadirkan antarmuka web yang hidup, taktil, dan digerakkan oleh prinsip fisika nyata.',
	philosophy: [
		'Kode bukan sekadar teks, melainkan instrumen digital dengan massa dan bobot.',
		'Desain antarmuka harus terasa dibuat oleh manusia pengrajin, bukan mesin cetak otomatis.',
		'Filosofi Linux: perkakas sederhana yang saling terhubung dan bekerja tanpa kompromi.'
	],
	tags: ['Svelte 5', 'TypeScript', 'Web Physics', 'Creative Web', 'Linux Enthusiast', 'Open Source'],
	stats: [
		{ label: 'Filosofi', value: 'Craft First' },
		{ label: 'Platform', value: 'GitHub Pages' },
		{ label: 'Runtime', value: 'Svelte 5' },
		{ label: 'Audio', value: 'Web Audio API' }
	],
	socials: [
		{ label: 'GitHub', url: 'https://github.com/padepokanpenguin', icon: 'github' },
		{ label: 'Repository', url: 'https://github.com/padepokanpenguin/padepokanpenguin.github.io', icon: 'git-branch' },
		{ label: 'Gemini API', url: 'https://github.com/padepokanpenguin/gemini-flash-api', icon: 'cpu' }
	]
};
