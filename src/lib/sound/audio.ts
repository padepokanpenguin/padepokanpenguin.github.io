/**
 * Zero-asset Web Audio Synthesizer
 * Generates tactile physical clicks, snaps, paper swooshes, and mascot chirps.
 */

class SoundEngine {
	private ctx: AudioContext | null = null;
	isMuted: boolean = false;

	constructor() {
		if (typeof window !== 'undefined') {
			this.isMuted = localStorage.getItem('sound_muted') === 'true';
		}
	}

	toggle(): boolean {
		this.isMuted = !this.isMuted;
		if (typeof window !== 'undefined') {
			localStorage.setItem('sound_muted', String(this.isMuted));
		}
		return this.isMuted;
	}

	private getContext(): AudioContext | null {
		if (typeof window === 'undefined') return null;
		if (!this.ctx) {
			const hasWebkit = 'webkitAudioContext' in window;
			const Ctor = window.AudioContext || (hasWebkit ? window.webkitAudioContext : null);
			if (Ctor) {
				this.ctx = new Ctor();
			}
		}
		if (this.ctx && this.ctx.state === 'suspended') {
			this.ctx.resume();
		}
		return this.ctx;
	}

	/** Mechanical pull-cord lamp click */
	playSwitchClick(isOn: boolean): void {
		if (this.isMuted) return;
		const ctx = this.getContext();
		if (!ctx) return;

		const now = ctx.currentTime;
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();

		osc.type = 'triangle';
		const startFreq = isOn ? 380 : 540;
		const endFreq = isOn ? 140 : 180;
		osc.frequency.setValueAtTime(startFreq, now);
		osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.045);

		gain.gain.setValueAtTime(0.25, now);
		gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

		osc.connect(gain);
		gain.connect(ctx.destination);

		osc.start(now);
		osc.stop(now + 0.05);

		// Secondary metallic snap pulse
		const snap = ctx.createOscillator();
		const snapGain = ctx.createGain();
		snap.type = 'sine';
		snap.frequency.setValueAtTime(1200, now + 0.015);
		snap.frequency.exponentialRampToValueAtTime(300, now + 0.035);

		snapGain.gain.setValueAtTime(0.15, now + 0.015);
		snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

		snap.connect(snapGain);
		snapGain.connect(ctx.destination);

		snap.start(now + 0.015);
		snap.stop(now + 0.035);
	}

	/** Tactile paper page turn swoosh */
	playPaperTurn(): void {
		if (this.isMuted) return;
		const ctx = this.getContext();
		if (!ctx) return;

		const bufferSize = ctx.sampleRate * 0.08;
		const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
		const data = buffer.getChannelData(0);
		for (let i = 0; i < bufferSize; i++) {
			data[i] = Math.random() * 2 - 1;
		}

		const noise = ctx.createBufferSource();
		noise.buffer = buffer;

		const filter = ctx.createBiquadFilter();
		filter.type = 'lowpass';
		filter.frequency.setValueAtTime(800, ctx.currentTime);
		filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.08);

		const gain = ctx.createGain();
		gain.gain.setValueAtTime(0.12, ctx.currentTime);
		gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

		noise.connect(filter);
		filter.connect(gain);
		gain.connect(ctx.destination);

		noise.start();
	}

	/** Desk sticker thud when dropped */
	playThud(): void {
		if (this.isMuted) return;
		const ctx = this.getContext();
		if (!ctx) return;

		const now = ctx.currentTime;
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();

		osc.type = 'sine';
		osc.frequency.setValueAtTime(140, now);
		osc.frequency.exponentialRampToValueAtTime(45, now + 0.07);

		gain.gain.setValueAtTime(0.18, now);
		gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

		osc.connect(gain);
		gain.connect(ctx.destination);

		osc.start(now);
		osc.stop(now + 0.07);
	}

	/** Cute penguin mascot squeak/chirp */
	playChirp(): void {
		if (this.isMuted) return;
		const ctx = this.getContext();
		if (!ctx) return;

		const now = ctx.currentTime;
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();

		osc.type = 'sine';
		osc.frequency.setValueAtTime(750, now);
		osc.frequency.exponentialRampToValueAtTime(1250, now + 0.06);
		osc.frequency.exponentialRampToValueAtTime(950, now + 0.12);

		gain.gain.setValueAtTime(0.18, now);
		gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

		osc.connect(gain);
		gain.connect(ctx.destination);

		osc.start(now);
		osc.stop(now + 0.13);
	}
}

export const sound = new SoundEngine();
