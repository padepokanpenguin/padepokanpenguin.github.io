<script lang="ts">
	import { onMount } from 'svelte';
	import TechCube3D from './TechCube3D.svelte';
	import { theme } from '#lib/state/theme.svelte';

	let mouseX = $state(0);
	let mouseY = $state(0);
	let sceneEl: HTMLDivElement | undefined = $state();
	let visible = $state(false);

	interface Particle {
		id: number;
		x: number;
		y: number;
		size: number;
		duration: number;
		delay: number;
		opacity: number;
	}

	const particles: Particle[] = Array.from({ length: 18 }, (_, i) => ({
		id: i,
		x: Math.random() * 100,
		y: Math.random() * 100,
		size: 2 + Math.random() * 4,
		duration: 6 + Math.random() * 8,
		delay: Math.random() * 5,
		opacity: 0.15 + Math.random() * 0.35,
	}));

	interface OrbitRing {
		id: number;
		rx: number;
		ry: number;
		rotation: number;
		duration: number;
		dotCount: number;
		opacity: number;
	}

	const orbitRings: OrbitRing[] = [
		{ id: 0, rx: 130, ry: 50, rotation: -15, duration: 20, dotCount: 3, opacity: 0.18 },
		{ id: 1, rx: 160, ry: 65, rotation: 25, duration: 28, dotCount: 2, opacity: 0.12 },
		{ id: 2, rx: 110, ry: 80, rotation: -40, duration: 24, dotCount: 2, opacity: 0.15 },
	];

	function handleMouseMove(e: MouseEvent) {
		if (!sceneEl) return;
		const rect = sceneEl.getBoundingClientRect();
		mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
		mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
	}

	onMount(() => {
		requestAnimationFrame(() => { visible = true; });
	});

	const parallaxBg = $derived(`translate(${mouseX * -6}px, ${mouseY * -6}px)`);
	const parallaxMid = $derived(`translate(${mouseX * -12}px, ${mouseY * -12}px)`);
</script>

<section
	bind:this={sceneEl}
	class="scene-3d-wrapper relative w-full overflow-hidden rounded-3xl border border-stone-200/70 dark:border-stone-800/70 bg-gradient-to-br from-stone-100 via-stone-50 to-amber-50/30 dark:from-stone-900 dark:via-stone-950 dark:to-stone-900 transition-colors duration-300"
	style="min-height: 320px;"
	onmousemove={handleMouseMove}
	aria-label="Visualisasi 3D tech stack interaktif"
>
	<!-- Ambient glow -->
	<div
		class="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out"
		style="transform: {parallaxBg};"
	>
		<div class="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-amber-400/10 dark:bg-amber-500/8 blur-3xl"></div>
		<div class="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-blue-400/8 dark:bg-blue-500/6 blur-3xl"></div>
	</div>

	<!-- Floating particles -->
	<div
		class="absolute inset-0 pointer-events-none transition-transform duration-500 ease-out"
		style="transform: {parallaxMid};"
	>
		{#each particles as p (p.id)}
			<div
				class="particle-dot absolute rounded-full bg-amber-500 dark:bg-amber-400"
				style="
					left: {p.x}%;
					top: {p.y}%;
					width: {p.size}px;
					height: {p.size}px;
					opacity: {p.opacity};
					animation: particleFloat {p.duration}s ease-in-out {p.delay}s infinite alternate;
				"
			></div>
		{/each}
	</div>

	<!-- Orbit rings (SVG) -->
	<div class="absolute inset-0 flex items-center justify-center pointer-events-none">
		<svg
			class="orbit-svg transition-transform duration-500 ease-out"
			style="transform: {parallaxMid};"
			width="360" height="240" viewBox="-180 -120 360 240"
			fill="none"
		>
			{#each orbitRings as ring (ring.id)}
				<g style="animation: orbitSpin {ring.duration}s linear infinite; transform-origin: center;">
					<ellipse
						rx={ring.rx}
						ry={ring.ry}
						stroke={theme.current === 'dark' ? 'rgba(245,158,11,0.12)' : 'rgba(180,140,60,0.12)'}
						stroke-width="1"
						stroke-dasharray="4 6"
						transform="rotate({ring.rotation})"
					/>
					{#each Array.from({ length: ring.dotCount }) as _, di}
						{@const angle = (di / ring.dotCount) * 360}
						<circle
							cx={ring.rx * Math.cos(angle * Math.PI / 180)}
							cy={ring.ry * Math.sin(angle * Math.PI / 180)}
							r="2.5"
							fill={theme.current === 'dark' ? 'rgba(251,191,36,0.4)' : 'rgba(217,119,6,0.35)'}
							transform="rotate({ring.rotation})"
						/>
					{/each}
				</g>
			{/each}
		</svg>
	</div>

	<!-- Central content -->
	<div
		class="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 py-10 px-4 sm:px-8 transition-all duration-700 {visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}"
	>
		<!-- Intro text -->
		<div class="flex flex-col items-center lg:items-start text-center lg:text-left max-w-sm">
			<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 dark:bg-amber-950/50 border border-amber-300/60 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 text-xs font-mono mb-3">
				<span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
				<span>Full-Stack Engineer</span>
			</div>
			<h1 class="text-2xl sm:text-3xl font-fraunces font-bold text-stone-900 dark:text-stone-50 tracking-tight leading-tight">
				Craft, Code,<br/>
				<span class="font-caveat text-amber-600 dark:text-amber-400">& Create</span>
			</h1>
			<p class="text-xs sm:text-sm font-inter text-stone-600 dark:text-stone-400 mt-3 leading-relaxed max-w-xs">
				Building scalable backends & expressive interfaces.
			</p>
		</div>

		<!-- 3D Cube -->
		<div class="flex-shrink-0">
			<TechCube3D size={110} />
		</div>
	</div>

	<!-- Bottom edge detail -->
	<div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 dark:via-amber-500/20 to-transparent"></div>
</section>

<style>
	@keyframes particleFloat {
		0% { transform: translateY(0) scale(1); }
		100% { transform: translateY(-18px) scale(0.7); }
	}

	@keyframes orbitSpin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	.orbit-svg {
		overflow: visible;
	}
</style>
