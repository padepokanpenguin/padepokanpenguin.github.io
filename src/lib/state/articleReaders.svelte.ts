import { shouldTriggerVisitor } from '#lib/utils/visitorTrigger';

/**
 * Pelacak pembaca artikel live real-time dari endpoint VisitorBadge.
 * Mengambil angka riil dari https://api.visitorbadge.io/api/visitors?path=padepokanpenguin.github.io/blog/{slug}
 * Didukung deduplikasi fingerprint browser dan IP address agar tidak menghitung ulang saat refresh.
 */
export class ArticleReadersTracker {
	private static readonly STORAGE_KEY = 'padepokan_article_live_readers';

	// Map slug artikel -> jumlah pembaca riil dari endpoint
	counts = $state<Record<string, number>>({});
	isReady = $state(false);
	init() {
		if (typeof window === 'undefined') return;

		// 1. Muat cache riil sebelumnya dari localStorage
		try {
			const saved = localStorage.getItem(ArticleReadersTracker.STORAGE_KEY);
			if (saved) {
				const parsed = JSON.parse(saved);
				if (parsed && typeof parsed === 'object') {
					this.counts = parsed;
				}
			}
		} catch {}

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

	async recordView(slug: string) {
		if (typeof window === 'undefined') return;

		const routePath = `padepokanpenguin.github.io/blog/${slug}`;

		// 1. Cek apakah pengunjung ini baru untuk artikel ini (berdasarkan fingerprint & IP)
		const isNewVisitor = await shouldTriggerVisitor(routePath);
		if (!isNewVisitor) {
			// Pengunjung sama dalam rentang 24 jam -> JANGAN tembak API agar counter tidak bertambah berulang
			return;
		}

		// 2. Hanya tembak API jika pengunjung/IP baru
		try {
			const res = await fetch(
				`https://api.visitorbadge.io/api/visitors?path=${encodeURIComponent(routePath)}`,
				{ signal: AbortSignal.timeout(6000) }
			);
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
}

export const articleReaders = new ArticleReadersTracker();
