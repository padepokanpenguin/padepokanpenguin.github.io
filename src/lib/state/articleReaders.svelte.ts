import { blogPosts } from '#lib/data/blogs';

/**
 * Pelacak pembaca artikel live real-time dari endpoint VisitorBadge.
 * Mengambil angka riil dari https://api.visitorbadge.io/api/visitors?path=padepokanpenguin.github.io/blog/{slug}
 * tanpa nilai hardcode.
 */
export class ArticleReadersTracker {
	private static readonly STORAGE_KEY = 'padepokan_article_live_readers';

	// Map slug artikel -> jumlah pembaca riil dari endpoint
	counts = $state<Record<string, number>>({});

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

		// 2. Sinkronisasi data live untuk semua artikel
		for (const post of blogPosts) {
			this.fetchCount(post.slug);
		}
	}

	getReaders(slug: string): number {
		return this.counts[slug] ?? 1;
	}

	async fetchCount(slug: string) {
		if (typeof window === 'undefined') return;
		try {
			const res = await fetch(
				`https://api.visitorbadge.io/api/visitors?path=padepokanpenguin.github.io/blog/${encodeURIComponent(slug)}`,
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

	recordView(slug: string) {
		this.fetchCount(slug);
	}
}

export const articleReaders = new ArticleReadersTracker();
