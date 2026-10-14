/**
 * Deduplikasi Pengunjung Unik berbasis Browser Fingerprint dan IP Address.
 * Menjamin API hit counter hanya ditembak jika pengunjung memiliki fingerprint atau IP yang baru,
 * mencegah hit berulang saat refresh atau revisi halaman yang sama.
 */

interface VisitorRecord {
	fingerprint: string;
	ip: string | null;
	visitedAt: number;
}

const STORAGE_PREFIX = 'pp_visitor_record_';
const DEDUPLICATION_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 jam per rute

/**
 * Membuat sidik jari perangkat/browser (Browser Fingerprint) berbasis hardware,
 * resolusi layar, timezone, bahasa, dan user agent.
 */
export function getBrowserFingerprint(): string {
	if (typeof window === 'undefined') return 'server';

	const components = [
		navigator.userAgent,
		navigator.language,
		`${screen.width}x${screen.height}x${screen.colorDepth}`,
		Intl.DateTimeFormat().resolvedOptions().timeZone,
		navigator.hardwareConcurrency || 4
	];

	// FNV-1a 32-bit hash
	let hash = 2166136261;
	const str = components.join('###');
	for (let i = 0; i < str.length; i++) {
		hash ^= str.charCodeAt(i);
		hash = Math.imul(hash, 16777619);
	}
	return (hash >>> 0).toString(16);
}

/**
 * Mendapatkan IP publik klien via layanan ipify (dengan timeout cepat).
 */
export async function getClientIP(): Promise<string | null> {
	if (typeof window === 'undefined') return null;
	try {
		const res = await fetch('https://api.ipify.org?format=json', {
			signal: AbortSignal.timeout(2500)
		});
		if (res.ok) {
			const data = await res.json();
			return typeof data.ip === 'string' ? data.ip : null;
		}
	} catch {}
	return null;
}

/**
 * Mengecek apakah pengunjung ini baru untuk rute yang diminta.
 * Hanya mengembalikan `true` jika fingerprint atau IP belum pernah tercatat
 * dalam jangka waktu deduplikasi (24 jam).
 */
export async function shouldTriggerVisitor(routePath: string): Promise<boolean> {
	if (typeof window === 'undefined') return false;

	const storageKey = STORAGE_PREFIX + encodeURIComponent(routePath);
	const fp = getBrowserFingerprint();
	const now = Date.now();

	// 1. Cek riwayat lokal untuk rute ini
	try {
		const raw = localStorage.getItem(storageKey);
		if (raw) {
			const record = JSON.parse(raw) as VisitorRecord;
			const isRecent = now - record.visitedAt < DEDUPLICATION_WINDOW_MS;

			// Jika fingerprint sama dan masih dalam rentang waktu, pengunjung sama -> JANGAN trigger
			if (isRecent && record.fingerprint === fp) {
				return false;
			}
		}
	} catch {}

	// 2. Jika fingerprint berbeda atau belum ada data, periksa IP publik
	const ip = await getClientIP();

	// Cek ulang jika IP sama dengan record sebelumnya
	try {
		const raw = localStorage.getItem(storageKey);
		if (raw) {
			const record = JSON.parse(raw) as VisitorRecord;
			const isRecent = now - record.visitedAt < DEDUPLICATION_WINDOW_MS;
			if (isRecent && ip && record.ip === ip) {
				return false;
			}
		}
	} catch {}

	// 3. Simpan record pengunjung baru untuk rute ini
	try {
		const newRecord: VisitorRecord = {
			fingerprint: fp,
			ip,
			visitedAt: now
		};
		localStorage.setItem(storageKey, JSON.stringify(newRecord));
	} catch {}

	return true;
}
