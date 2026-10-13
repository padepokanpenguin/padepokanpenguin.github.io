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
		category: 'Full-stack AI & Agentic System',
		year: '2026',
		description: 'Aplikasi full-stack enterprise berbasis Turborepo monorepo untuk mengelola AI agents, workflow automation, intelligent routing, multi-channel customer engagement, dan type-safe RPC.',
		tech: ['Turborepo', 'React', 'Hono', 'Mastra.ai', 'oRPC', 'PostgreSQL', 'Drizzle ORM', 'BullMQ', 'Redis'],
		demo: 'https://mitrachat.id',
		demoLabel: 'Kunjungi mitrachat.id',
		highlight: 'Multi-agent orchestration, distributed message queues via BullMQ, dan embeddable webchat widget'
	},
	{
		id: 'gemini-flash-api',
		title: 'Gemini Flash API Gateway',
		category: 'Backend & AI Integration',
		year: '2025',
		description: 'API gateway dan wrapper berkinerja tinggi untuk model Gemini Flash, memfasilitasi integrasi LLM cepat dengan penanganan streaming respons.',
		tech: ['TypeScript', 'Node.js', 'Google GenAI SDK', 'REST API'],
		github: 'https://github.com/padepokanpenguin/gemini-flash-api',
		highlight: 'Sub-second response streaming dan token handling yang efisien'
	},
	{
		id: 'toefl-toeic-gmc',
		title: 'TOEFL & TOEIC Prediction Test System',
		category: 'Full-stack Platform',
		year: '2023',
		description: 'Sistem evaluasi kecakapan bahasa Inggris lengkap dengan simulasi ujian real-time, skoring otomatis, dan media storage Cloudflare R2.',
		tech: ['Next.js', 'React.js', 'AdonisJS', 'PostgreSQL', 'Cloudflare R2', 'Linux VPS'],
		demo: 'https://exam.gmcendekia.com',
		highlight: 'Antarmuka tes responsif dengan scoring logic dan manajemen berkas audio listening'
	},
	{
		id: 'deskfolio-svelte',
		title: 'DeskFolio Svelte 5 Edition',
		category: 'Creative Frontend & Physics',
		year: '2026',
		description: 'Rekonstruksi portofolio meja kerja interaktif bergaya FeralUI menggunakan Svelte 5 Runes dan spring bawaan tanpa library pihak ketiga yang membengkak.',
		tech: ['Svelte 5', 'TypeScript', 'svelte/motion', 'Tailwind v4'],
		github: 'https://github.com/padepokanpenguin/padepokanpenguin.github.io',
		demo: '#',
		highlight: 'Zero Virtual DOM overhead, ukuran bundle hanya ~25KB gzipped'
	},
	{
		id: 'verlet-cord-engine',
		title: 'Verlet Rope Physics Switch',
		category: 'Physics Simulation',
		year: '2026',
		description: 'Engine simulasi tali Verlet dengan constraint relaxation dan inersia mouse/touch yang menggerakkan saklar lampu tema dengan sensasi taktil nyata.',
		tech: ['HTML5 Canvas', 'Mathematics', 'Verlet Integration'],
		github: 'https://github.com/padepokanpenguin/padepokanpenguin.github.io',
		highlight: 'Performa konsisten 60 FPS dengan 3x constraint relaxation loop'
	},
	{
		id: 'web-audio-synth',
		title: 'Synthesized Web Haptics',
		category: 'Audio Engineering',
		year: '2026',
		description: 'Generator efek suara mikro-taktil murni menggunakan Web Audio API oscillator dan lowpass filter. Zero file audio eksternal untuk load time instan.',
		tech: ['Web Audio API', 'Signal Synthesis', 'TypeScript'],
		github: 'https://github.com/padepokanpenguin/padepokanpenguin.github.io',
		highlight: 'Nol latency, nol aset statis MP3, ramah kuota pengguna'
	}
];
