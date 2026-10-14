import { blogPosts } from '#lib/data/blogs';
import { shouldTriggerVisitor } from '#lib/utils/visitorTrigger';

/**
 * Pelacak pembaca artikel live real-time dari endpoint VisitorBadge.
 * Menggunakan readonly=true saat hanya menampilkan angka pembaca (list view),
 * dan menghilangkan readonly saat artikel diklik/dibaca (detail view) agar counter bertambah.
 */
export class ArticleReadersTracker {
	private static readonly STORAGE_KEY = 'padepokan_article_live_readers';

	// Map slug artikel -> jumlah pembaca riil dari endpoint
	counts = $state<Record<string, number>>({});
	isReady = $state(false);

	init() {
		if (typeof window === 'undefined') return;

		// 1. Muat cache riil sebelumnya dari localStorage agar langsung tampil
		try {
			const saved = localStorage.getItem(ArticleReadersTracker.STORAGE_KEY);
			if (saved) {
				const parsed = JSON.parse(saved);
				if (parsed && typeof parsed === 'object') {
					this.counts = parsed;
				}
			}
		} catch {}

		// 2. Fetch live data semua artikel dengan readonly=true (tanpa menambah counter)
		for (const post of blogPosts) {
			this.fetchCount(post.slug, true);
		}

		// Berikan sedikit jeda transisi agar efek blur loading awal bertransisi secara mulus
		setTimeout(() => {
			this.isReady = true;
		}, 400);
	}

	isLoaded(slug: string): boolean {
		return this.isReady || this.counts[slug] !== undefined;
	}

	getReaders(slug: string): number {
		return this.counts[slug] ?? 1;
	}

	/**
	 * Mengambil data jumlah pembaca artikel dari API.
	 * Jika readonly = true: counter di server TIDAK bertambah (hanya membaca angka terkini).
	 * Jika readonly = false: counter di server BERTAMBAH (+1).
	 */
	async fetchCount(slug: string, readonly: boolean = true) {
		if (typeof window === 'undefined') return;

		const routePath = `padepokanpenguin.github.io/blog/${slug}`;
		const query = readonly ? '&readonly=true' : '';
		const url = `https://api.visitorbadge.io/api/visitors?path=${encodeURIComponent(routePath)}${query}`;

		try {
			const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
			if (res.ok) {
				const svgText = await res.text();
				const match = svgText.match(/VISITORS:?\s*([\d,.]+)/i);
				if (match && match[1]) {
					const remoteNum = parseInt(match[1].replace(/[,.]/g, ''), 10);
					if (!isNaN(remoteNum)) {
						this.counts = { ...this.counts, [slug]: remoteNum };
						try {
							localStorage.setItem(
								ArticleReadersTracker.STORAGE_KEY,
								JSON.stringify(this.counts)
							);
						} catch {}
					}
				}
			}
		} catch {}
	}

	/**
	 * Dipanggil saat pengunjung mengklik ke baca artikel atau berada di detail artikel.
	 * Menghilangkan readonly jika pengunjung baru sehingga counter bertambah di server.
	 */
	async recordView(slug: string) {
		if (typeof window === 'undefined') return;

		const routePath = `padepokanpenguin.github.io/blog/${slug}`;

		// 1. Cek apakah pengunjung ini baru untuk artikel ini (berdasarkan fingerprint & IP)
		const isNewVisitor = await shouldTriggerVisitor(routePath);

		// Jika pengunjung baru: hilangkan readonly (readonly = false) agar counter bertambah (+1)
		// Jika pengunjung sama dalam 24 jam: gunakan readonly = true agar counter tidak bertambah berulang
		await this.fetchCount(slug, !isNewVisitor);
	}
}

export const articleReaders = new ArticleReadersTracker();
