<script lang="ts">
	import { onMount } from 'svelte';
	import { theme } from '#lib/state/theme.svelte';
	import { sound } from '#lib/sound/audio';

	let isHovered = $state(false);

	function toggleLantern() {
		const willBeLight = theme.current === 'dark';
		theme.toggle();

		if (willBeLight) {
			sound.playLanternIgnite();
		} else {
			sound.playLanternExtinguish();
		}
	}

	onMount(() => {
		theme.init();
	});
</script>

<div class="relative inline-flex items-center select-none group">
	<button
		type="button"
		class="relative p-1 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
		onclick={toggleLantern}
		onmouseenter={() => (isHovered = true)}
		onmouseleave={() => (isHovered = false)}
		aria-label={theme.current === 'dark' ? 'Nyalakan lentera (Mode Terang)' : 'Padamkan lentera (Mode Gelap)'}
		title={theme.current === 'dark' ? 'Nyalakan lentera' : 'Padamkan lentera'}
	>
		<!-- Antique Oil Lantern SVG -->
		<svg
			viewBox="0 0 54 68"
			class="w-10 h-13 sm:w-11 sm:h-14 overflow-visible transition-all duration-300 {theme.current === 'light' ? 'drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]' : 'drop-shadow-sm'}"
		>
			<defs>
				<!-- Flame Gradient -->
				<radialGradient id="flameGrad" cx="50%" cy="75%" r="60%">
					<stop offset="0%" stop-color="#FFFFFF" />
					<stop offset="25%" stop-color="#FEF08A" />
					<stop offset="65%" stop-color="#F59E0B" />
					<stop offset="100%" stop-color="#DC2626" />
				</radialGradient>

				<!-- Glass Halo Gradient -->
				<radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
					<stop offset="0%" stop-color="rgba(254, 240, 138, 0.45)" />
					<stop offset="70%" stop-color="rgba(245, 158, 11, 0.15)" />
					<stop offset="100%" stop-color="rgba(245, 158, 11, 0)" />
				</radialGradient>
			</defs>

			<!-- Top Brass Carrying Ring -->
			<circle
				cx="27"
				cy="7"
				r="5.5"
				class="fill-none stroke-amber-600 dark:stroke-amber-700 transition-colors"
				stroke-width="2.2"
			/>
			<rect
				x="25"
				y="12"
				width="4"
				height="3"
				rx="1"
				class="fill-amber-700 dark:fill-amber-800"
			/>

			<!-- Lantern Vented Chimney Roof -->
			<path
				d="M 17,21 L 22,15 L 32,15 L 37,21 Z"
				class="fill-stone-800 dark:fill-stone-700 stroke-amber-600 dark:stroke-amber-600/70"
				stroke-width="1.2"
			/>
			<!-- Chimney ventilation dots -->
			<circle cx="23" cy="18" r="1" class="fill-amber-400/80" />
			<circle cx="27" cy="18" r="1" class="fill-amber-400/80" />
			<circle cx="31" cy="18" r="1" class="fill-amber-400/80" />

			<!-- Glass Chamber Outer Frame -->
			<rect
				x="16"
				y="21"
				width="22"
				height="28"
				rx="5"
				class="{theme.current === 'light'
					? 'fill-amber-100/30 stroke-amber-500/80'
					: 'fill-stone-800/40 stroke-stone-600/60'} transition-all duration-300"
				stroke-width="1.8"
			/>

			<!-- Warm Glass Glow Halo in Light Mode -->
			{#if theme.current === 'light'}
				<circle cx="27" cy="35" r="18" fill="url(#lanternGlow)" class="animate-pulse" />
			{/if}

			<!-- Inner Wick Stand -->
			<rect x="25" y="44" width="4" height="4" rx="1" class="fill-stone-700 dark:fill-stone-600" />
			<line x1="27" y1="44" x2="27" y2="41" class="stroke-stone-900 dark:stroke-stone-400 stroke-1" />

			<!-- FLAME OR SMOKE -->
			{#if theme.current === 'light'}
				<!-- Dancing Living Flame -->
				<g class="flame-flicker">
					<!-- Outer fire aura -->
					<path
						d="M 27,27 C 22,34 23,41 27,41 C 31,41 32,34 27,27 Z"
						fill="url(#flameGrad)"
						class="drop-shadow-sm"
					/>
					<!-- Inner hot core -->
					<ellipse cx="27" cy="38" rx="2" ry="3.5" class="fill-white" />
				</g>
			{:else}
				<!-- Extinguished Ember Wick -->
				<circle cx="27" cy="41" r="1.3" class="fill-rose-500 animate-pulse" />

				<!-- Subtle Wisps of Smoke Drifting -->
				<g class="smoke-wisp opacity-75">
					<path
						d="M 27,39 Q 25,33 27,29 T 26,23"
						class="fill-none stroke-stone-400/50 stroke-1"
						stroke-linecap="round"
					/>
					<circle cx="26" cy="22" r="1" class="fill-stone-400/30" />
				</g>
			{/if}

			<!-- Protective Wire Bars on Glass -->
			<line x1="16" y1="35" x2="38" y2="35" class="stroke-stone-700/40 dark:stroke-stone-500/30 stroke-1" />
			<line x1="21" y1="21" x2="21" y2="49" class="stroke-stone-700/40 dark:stroke-stone-500/30 stroke-1" />
			<line x1="33" y1="21" x2="33" y2="49" class="stroke-stone-700/40 dark:stroke-stone-500/30 stroke-1" />

			<!-- Bottom Metal Base -->
			<path
				d="M 14,49 L 17,54 L 37,54 L 40,49 Z"
				class="fill-stone-800 dark:fill-stone-700 stroke-amber-600 dark:stroke-amber-600/70"
				stroke-width="1.2"
			/>
			<rect x="18" y="54" width="18" height="3" rx="1.5" class="fill-amber-700 dark:fill-amber-800" />
		</svg>
	</button>

	<!-- Hand-drawn Label Hint (Desktop only) -->
	<div
		class="pointer-events-none hidden md:flex items-center gap-1 ml-1 text-xs font-caveat text-stone-500 dark:text-stone-400 leading-none transition-opacity duration-200"
		class:opacity-100={isHovered}
		class:opacity-60={!isHovered}
	>
		<svg class="w-4 h-4 -rotate-90 shrink-0 stroke-current" viewBox="0 0 24 24" fill="none">
			<path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
		<span>{theme.current === 'dark' ? 'Nyalakan lentera' : 'Padamkan lentera'}</span>
	</div>
</div>

<style>
	@keyframes flicker {
		0%, 100% {
			transform: scale(1, 1) translate(0, 0);
		}
		25% {
			transform: scale(0.96, 1.05) translate(-0.3px, -0.6px);
		}
		50% {
			transform: scale(1.04, 0.95) translate(0.4px, 0.2px);
		}
		75% {
			transform: scale(0.98, 1.03) translate(-0.2px, -0.4px);
		}
	}

	@keyframes smokeDrift {
		0% {
			opacity: 0.8;
			transform: translateY(0) scaleX(1);
		}
		50% {
			opacity: 0.5;
			transform: translateY(-2px) scaleX(1.15);
		}
		100% {
			opacity: 0.2;
			transform: translateY(-5px) scaleX(1.3);
		}
	}

	.flame-flicker {
		transform-origin: 27px 41px;
		animation: flicker 1.8s ease-in-out infinite;
	}

	.smoke-wisp {
		animation: smokeDrift 2.4s ease-out infinite;
	}
</style>
