import { shouldTriggerVisitor } from '#lib/utils/visitorTrigger';

/**
 * Pelacak Pengunjung (Visitor Counter) via VisitorBadge API.
 * Menampilkan jumlah pengunjung asli (real-time live) langsung dari endpoint
 * sesuai dengan path route yang sedang dibuka (misal: padepokanpenguin.github.io atau padepokanpenguin.github.io/blog/[slug]).
 * Dilengkapi deduplikasi fingerprint browser dan IP address agar tidak menghitung ulang saat refresh.
 */
export class VisitorTracker {
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

		const storageKey = `padepokan_visitor_${path.replace(/[^a-zA-Z0-9_-]/g, '_')}`;

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

			// Cek apakah pengunjung ini baru untuk route ini (berdasarkan fingerprint & IP)
			const isNewVisitor = await shouldTriggerVisitor(path);
			if (!isNewVisitor) {
				// Pengunjung sama dalam rentang 24 jam -> JANGAN tembak API agar counter tidak bertambah berulang
				return;
			}

			// Panggil API hit counter live hanya jika pengunjung baru
			const res = await fetch(
				`https://api.visitorbadge.io/api/visitors?path=${encodeURIComponent(path)}`,
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
