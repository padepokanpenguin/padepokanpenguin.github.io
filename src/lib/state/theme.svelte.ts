export class ThemeManager {
	current = $state<'light' | 'dark'>('light');

	init() {
		if (typeof window === 'undefined') return;
		const saved = localStorage.getItem('theme_preference');
		if (saved === 'dark' || saved === 'light') {
			this.current = saved;
		} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			this.current = 'dark';
		}
		this.apply();
	}

	toggle() {
		this.current = this.current === 'light' ? 'dark' : 'light';
		if (typeof window !== 'undefined') {
			localStorage.setItem('theme_preference', this.current);
		}
		this.apply();
	}

	private apply() {
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-theme', this.current);
			const meta = document.querySelector('meta[name="theme-color"]');
			if (meta) {
				meta.setAttribute('content', this.current === 'dark' ? '#0D1117' : '#F5F4EF');
			}
		}
	}
}

export const theme = new ThemeManager();
