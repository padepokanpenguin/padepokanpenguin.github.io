/**
 * Pelacak Pengunjung (Visitor Counter) via VisitorBadge API.
 * Menampilkan jumlah pengunjung asli (real-time live) langsung dari endpoint.
 * Hanya memanggil tanpa readonly pada render pertama kali di perangkat pengunjung.
 * Semua pemanggilan berikutnya (refresh, navigasi, atau revisit) menggunakan readonly=true
 * agar angka tetap sinkron secara live tanpa menambah counter berulang.
 */
export class VisitorTracker {
	private static readonly STORAGE_KEY = 'padepokan_visitor_count';
	private static readonly FIRST_HIT_KEY = 'padepokan_first_render_hit';

	count = $state<number | null>(null);
	isLoading = $state(false);

	async init(customPath?: string) {
		if (typeof window === 'undefined') return;

		// Tentukan path route secara presisi sesuai URL aktif
		let path = customPath;
		if (!path) {
			const pathname = window.location.pathname.replace(/\/$/, '');
			path = pathname && pathname !== '/'
				? `padepokanpenguin.github.io${pathname}`
				: 'padepokanpenguin.github.io';
		}

		const storageKey = `${VisitorTracker.STORAGE_KEY}_${path.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
		const firstHitKey = `${VisitorTracker.FIRST_HIT_KEY}_${path.replace(/[^a-zA-Z0-9_-]/g, '_')}`;

		// 1. Ambil nilai cache lokal agar angka riil sebelumnya langsung tampil
		const cached = localStorage.getItem(storageKey);
		if (cached) {
			const parsed = parseInt(cached, 10);
			if (!isNaN(parsed) && parsed > 0) {
				this.count = parsed;
			}
		}

		try {
			this.isLoading = true;

			// Periksa apakah ini render pertama kali untuk path ini di perangkat ini
			const hasTriggeredFirstHit = localStorage.getItem(firstHitKey);

			// Hanya render pertama kali yang tanpa readonly (menambah counter +1 di server)
			// Sisanya (refresh, pindah tab, buka kembali) selalu menggunakan &readonly=true
			const query = hasTriggeredFirstHit ? '&readonly=true' : '';

			const res = await fetch(
				`https://api.visitorbadge.io/api/visitors?path=${encodeURIComponent(path)}${query}`,
				{ signal: AbortSignal.timeout(6000) }
			);

			if (res.ok) {
				const svgText = await res.text();
				const match = svgText.match(/VISITORS:?\s*([\d,.]+)/i);
				if (match && match[1]) {
					const remoteNum = parseInt(match[1].replace(/[,.]/g, ''), 10);
					if (!isNaN(remoteNum)) {
						this.count = remoteNum;
						localStorage.setItem(storageKey, String(remoteNum));
						// Tandai bahwa render pertama kali telah dipanggil
						localStorage.setItem(firstHitKey, '1');
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
