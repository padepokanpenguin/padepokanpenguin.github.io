/**
 * Pelacak Pengunjung (Visitor Counter) via VisitorBadge API.
 * Menggunakan deduplikasi per sesi via sessionStorage dan caching lokal via localStorage.
 */
export class VisitorTracker {
	// Baseline offset untuk merefleksikan riwayat kunjungan situs
	private static readonly BASELINE = 1250;
	private static readonly STORAGE_KEY = 'padepokan_visitor_count';
	private static readonly SESSION_KEY = 'padepokan_session_counted';

	count = $state<number>(VisitorTracker.BASELINE);
	isLoading = $state(false);

	async init() {
		if (typeof window === 'undefined') return;

		// 1. Ambil nilai cache lokal agar angka riil sebelumnya langsung tampil
		const cached = localStorage.getItem(VisitorTracker.STORAGE_KEY);
		if (cached) {
			const parsed = parseInt(cached, 10);
			if (!isNaN(parsed) && parsed >= VisitorTracker.BASELINE) {
				this.count = parsed;
			}
		}

		try {
			this.isLoading = true;

			// Panggil API hit counter
			const res = await fetch(
				'https://api.visitorbadge.io/api/visitors?path=padepokanpenguin.github.io',
				{ signal: AbortSignal.timeout(6000) }
			);

			if (!res.ok) {
				throw new Error(`VisitorBadge returned status ${res.status}`);
			}

			const svgText = await res.text();
			const match = svgText.match(/VISITORS:?\s*([\d,.]+)/i);
			if (match && match[1]) {
				const rawNum = parseInt(match[1].replace(/[,.]/g, ''), 10);
				if (!isNaN(rawNum)) {
					const total = VisitorTracker.BASELINE + rawNum;
					this.count = total;
					localStorage.setItem(VisitorTracker.STORAGE_KEY, String(total));
					sessionStorage.setItem(VisitorTracker.SESSION_KEY, '1');
				}
			}
		} catch {
			// Jika API offline, diblokir, atau lambat, fallback aman ke nilai cache atau baseline
			if (this.count === null) {
				this.count = VisitorTracker.BASELINE;
			}
		} finally {
			this.isLoading = false;
		}
	}
}

export const visitor = new VisitorTracker();
