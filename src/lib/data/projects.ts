export interface Project {
	id: string;
	title: string;
	category: string;
	year: string;
	description: string;
	tech: string[];
	github?: string;
	demo?: string;
	demoLabel?: string;
	highlight: string;
}

export const projects: Project[] = [
	{
		id: 'mitrachat-ai-app',
		title: 'MitraChat AI Platform',
		category: 'Full-Stack AI & Agentic System',
		year: '2026',
		description: 'Platform full-stack enterprise berbasis Turborepo monorepo untuk orkestrasi AI agents, otomatisasi alur kerja, intelligent routing, layanan pelanggan multi-kanal, dan komunikasi type-safe RPC.',
		tech: ['Turborepo', 'React', 'Hono', 'Mastra.ai', 'oRPC', 'PostgreSQL', 'Drizzle ORM', 'BullMQ', 'Redis'],
		demo: 'https://mitrachat.id',
		demoLabel: 'Kunjungi mitrachat.id',
		highlight: 'Multi-agent orchestration, antrean pesan terdistribusi via BullMQ, dan widget webchat terintegrasi'
	},
	{
		id: 'toefl-toeic-gmc',
		title: 'TOEFL & TOEIC Prediction Test System',
		category: 'Full-Stack EdTech Platform',
		year: '2023',
		description: 'Sistem evaluasi kecakapan bahasa Inggris daring lengkap dengan simulasi ujian berwaktu real-time, kalkulasi skor otomatis, dan penyimpanan media audio di Cloudflare R2.',
		tech: ['Next.js', 'React.js', 'AdonisJS', 'PostgreSQL', 'Cloudflare R2', 'Linux VPS'],
		demo: 'https://exam.gmcendekia.com',
		demoLabel: 'Lihat Platform Ujian',
		highlight: 'Antarmuka ujian anti-gangguan dengan mesin skoring otomatis dan streaming audio listening'
	},
	{
		id: 'dotvim',
		title: 'Dotvim (Neovim Config)',
		category: 'Developer Tooling & Linux Environment',
		year: '2026',
		description: 'Konfigurasi Neovim modern berbasis Lua yang dioptimalkan untuk API Neovim terkini (0.12+), dilengkapi native LSP, Tree-sitter, Telescope, dan manajemen plugin modular via lazy.nvim.',
		tech: ['Lua', 'Neovim 0.12+', 'Tree-sitter', 'LSP', 'lazy.nvim', 'Telescope'],
		github: 'https://github.com/padepokanpenguin/dotvim',
		highlight: 'Konfigurasi native vim.lsp.config, auto-bootstrap lazy.nvim, dan kode formatter berkecepatan tinggi'
	},
	{
		id: 'padepokan-archive',
		title: 'Padepokan Archive (Interactive Desk)',
		category: 'Creative Web & UI Engineering',
		year: '2026',
		description: 'Portofolio dan buku catatan digital berkonsep meja kerja interaktif menggunakan Svelte 5 Runes, mikro-interaksi taktil berbasis pegas (spring motion), dan sintesis audio prosedural tanpa pustaka eksternal berat.',
		tech: ['Svelte 5', 'TypeScript', 'svelte/motion', 'Tailwind CSS v4', 'Web Audio API'],
		github: 'https://github.com/padepokanpenguin/padepokanpenguin.github.io',
		highlight: 'Zero Virtual DOM overhead, prerendering statis ramah SEO, dan ukuran bundle ekstra ringan (~25KB gzipped)'
	}
];