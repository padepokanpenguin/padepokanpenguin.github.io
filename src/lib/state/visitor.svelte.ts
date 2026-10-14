/**
 * Pelacak Pengunjung Global (Visitor Counter) via VisitorBadge API.
 * Menampilkan jumlah pengunjung asli (real-time live) langsung dari endpoint tanpa nilai hardcode/baseline.
 */
export class VisitorTracker {
	private static readonly STORAGE_KEY = 'padepokan_visitor_count';

	count = $state<number | null>(null);
	isLoading = $state(false);

	async init() {
		if (typeof window === 'undefined') return;

		// 1. Ambil nilai cache lokal agar angka riil sebelumnya langsung tampil
		const cached = localStorage.getItem(VisitorTracker.STORAGE_KEY);
		if (cached) {
			const parsed = parseInt(cached, 10);
			if (!isNaN(parsed) && parsed > 0) {
				this.count = parsed;
			}
		}

		try {
			this.isLoading = true;

			// Panggil API hit counter live
			const res = await fetch(
				'https://api.visitorbadge.io/api/visitors?path=padepokanpenguin.github.io',
				{ signal: AbortSignal.timeout(6000) }
			);

			if (res.ok) {
				const svgText = await res.text();
				const match = svgText.match(/VISITORS:?\s*([\d,.]+)/i);
				if (match && match[1]) {
					const remoteNum = parseInt(match[1].replace(/[,.]/g, ''), 10);
					if (!isNaN(remoteNum)) {
						this.count = remoteNum;
						localStorage.setItem(VisitorTracker.STORAGE_KEY, String(remoteNum));
					}
				}
			}
		} catch {
			// Fallback ke cache lokal jika offline
		} finally {
			this.isLoading = false;
		}
	}
}

export const visitor = new VisitorTracker();
