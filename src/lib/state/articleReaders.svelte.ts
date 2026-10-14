import type { BlogPost } from '#lib/data/blogs';

/**
 * Pelacak pembaca artikel dinamis via VisitorBadge API.
 * Mendukung deduplikasi per sesi via sessionStorage dan caching lokal via localStorage.
 */
export class ArticleReadersTracker {
	private static readonly STORAGE_KEY = 'padepokan_article_increments';
	private static readonly SESSION_PREFIX = 'padepokan_read_';

	increments = $state<Record<string, number>>({});

	init() {
		if (typeof window === 'undefined') return;
		try {
			const saved = localStorage.getItem(ArticleReadersTracker.STORAGE_KEY);
			if (saved) {
				const parsed = JSON.parse(saved);
				if (parsed && typeof parsed === 'object') {
					this.increments = parsed;
				}
			}
		} catch {
			// abaikan error parsing lokal
		}
	}

	getReaders(post: BlogPost): number {
		return post.readers + (this.increments[post.slug] || 0);
	}

	async recordView(slug: string) {
		if (typeof window === 'undefined') return;

		const sessionKey = ArticleReadersTracker.SESSION_PREFIX + slug;
		const alreadyCountedInSession = sessionStorage.getItem(sessionKey);

		// Jika belum dihitung di sesi ini, catat kenaikan optimistik langsung ke UI
		if (!alreadyCountedInSession) {
			sessionStorage.setItem(sessionKey, '1');
			const nextVal = (this.increments[slug] || 0) + 1;
			this.increments = { ...this.increments, [slug]: nextVal };
			try {
				localStorage.setItem(
					ArticleReadersTracker.STORAGE_KEY,
					JSON.stringify(this.increments)
				);
			} catch {}
		}

		// Sinkronisasi dengan remote hit counter API di background
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
						const currentVal = this.increments[slug] || 0;
						const resolved = Math.max(currentVal, remoteNum);
						this.increments = { ...this.increments, [slug]: resolved };
						localStorage.setItem(
							ArticleReadersTracker.STORAGE_KEY,
							JSON.stringify(this.increments)
						);
					}
				}
			}
		} catch {
			// Fallback aman: nilai lokal optimistik tetap bertahan
		}
	}
}

export const articleReaders = new ArticleReadersTracker();
