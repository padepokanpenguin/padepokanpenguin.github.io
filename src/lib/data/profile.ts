export interface Profile {
	name: string;
	realName: string;
	title: string;
	handle: string;
	domain: string;
	bio: string;
	philosophy: string[];
	tags: string[];
	experience: {
		role: string;
		company: string;
		period: string;
		desc: string;
	}[];
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
/**
 * Menghitung durasi pengalaman secara dinamis dari Oktober 2022 hingga waktu saat ini.
 */
export function calculateExperienceYears(): string {
	const start = new Date(2022, 9, 1); // 1 Oktober 2022 (bulan 9 di JavaScript Date = Oktober)
	const now = new Date();
	const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
	const years = Math.floor(months / 12);
	return `${years}+ Tahun`;
}

export const profile: Profile = {
	name: 'Padepokan Penguin',
	realName: 'Aria Nur Jamal',
	title: 'Full-stack Engineer & Creative Web Craftsman',
	handle: 'padepokanpenguin',
	domain: 'padepokanpenguin.github.io',
	bio: 'Dojo digital Aria Nur Jamal. Full-stack developer berfokus pada skalabilitas backend dan enterprise middleware, dengan ketertarikan mengeksplorasi antarmuka web yang interaktif dan ekspresif.',
	philosophy: [
		'Kode bukan sekadar baris teks, melainkan instrumen digital dengan bobot, presisi, dan integritas arsitektural.',
		'Desain antarmuka harus terasa dibuat oleh tangan pengrajin (craftsmanship), bukan mesin cetak otomatis yang hambar.',
		'Filosofi Linux: perkakas sederhana, modular, saling terhubung, dan tangguh di lingkungan produksi.'
	],
	tags: ['Svelte 5', 'TypeScript', 'Node.js', 'Next.js', 'AdonisJS', 'Linux VPS', 'Web Physics', 'Open Source'],
	experience: [
		{
			role: 'Fullstack Developer',
			company: 'Siloam Hospital Group',
			period: 'Dec 2023 — Sekarang',
			desc: 'Pengembangan & pemeliharaan modul HIS, WMS, MySiloam, dan integrasi middleware (Redis, RabbitMQ, Kafka, ELK Stack) dengan standar kepatuhan 100% SLA.'
		},
		{
			role: 'Backend Developer',
			company: 'Future Gate High School',
			period: 'May 2023 — Dec 2023',
			desc: 'Arsitektur sistem informasi sekolah menggunakan AdonisJS, PostgreSQL, Linux VPS hardening, dan CI/CD pipeline otomatis.'
		},
		{
			role: 'Programmer',
			company: 'PT. Abqory Sharia Group',
			period: 'Oct 2022 — Mar 2023',
			desc: 'Membangun dan meluncurkan platform e-course edukasi menggunakan Next.js, integrasi RESTful API dengan Strapi CMS, dan manajemen konten dinamis.'
		}
	],
	stats: [
		{
			label: 'Pengalaman',
			get value() {
				return calculateExperienceYears();
			}
		},
		{ label: 'Fokus', value: 'Full-stack & UI Craft' },
		{ label: 'Framework Utama', value: 'Svelte 5 & Node.js' },
		{ label: 'Hosting', value: 'GitHub Pages' }
	],
	socials: [
		{ label: 'GitHub', url: 'https://github.com/padepokanpenguin', icon: 'github' },
		{ label: 'LinkedIn', url: 'https://www.linkedin.com/in/aria-nur-jamal-ba5856231/', icon: 'linkedin' },
		{ label: 'Twitter / X', url: 'https://twitter.com/aria_nur_jamal', icon: 'twitter' },
		{ label: 'Telegram', url: 'https://t.me/kalang_kabut', icon: 'send' },
		{ label: 'Download CV', url: 'https://docs.google.com/document/d/1IDG9QYp2nHVptUbDT_KraNNIb4oZUx8MURamvQDdkEI/edit?tab=t.0', icon: 'file-text' }
	]
};
