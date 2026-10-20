<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	interface Props {
		size?: number;
		autoRotate?: boolean;
	}

	let { size = 120, autoRotate = true }: Props = $props();

	let rotX = $state(-25);
	let rotY = $state(35);
	let isHovering = $state(false);
	let animFrame = 0;
	let startTime = 0;
	let containerEl: HTMLDivElement | undefined = $state();

	const faces = [
		{ label: 'Svelte', icon: '⚡', bg: 'from-orange-500/20 to-orange-600/10', border: 'border-orange-500/30', text: 'text-orange-600 dark:text-orange-400' },
		{ label: 'Node.js', icon: '🟢', bg: 'from-emerald-500/20 to-emerald-600/10', border: 'border-emerald-500/30', text: 'text-emerald-600 dark:text-emerald-400' },
		{ label: 'TypeScript', icon: '🔷', bg: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/30', text: 'text-blue-600 dark:text-blue-400' },
		{ label: 'Linux', icon: '🐧', bg: 'from-amber-500/20 to-amber-600/10', border: 'border-amber-500/30', text: 'text-amber-600 dark:text-amber-400' },
		{ label: 'Docker', icon: '🐳', bg: 'from-cyan-500/20 to-cyan-600/10', border: 'border-cyan-500/30', text: 'text-cyan-600 dark:text-cyan-400' },
		{ label: 'PostgreSQL', icon: '🐘', bg: 'from-indigo-500/20 to-indigo-600/10', border: 'border-indigo-500/30', text: 'text-indigo-600 dark:text-indigo-400' },
	];

	function handleMouseMove(e: MouseEvent) {
		if (!containerEl || !isHovering) return;
		const rect = containerEl.getBoundingClientRect();
		const cx = rect.left + rect.width / 2;
		const cy = rect.top + rect.height / 2;
		const dx = (e.clientX - cx) / (rect.width / 2);
		const dy = (e.clientY - cy) / (rect.height / 2);
		rotY = dx * 40;
		rotX = -dy * 30;
	}

	function animate(t: number) {
		if (!startTime) startTime = t;
		if (autoRotate && !isHovering) {
			const elapsed = (t - startTime) / 1000;
			rotY = 35 + elapsed * 12;
			rotX = -25 + Math.sin(elapsed * 0.5) * 8;
		}
		animFrame = requestAnimationFrame(animate);
	}

	onMount(() => {
		animFrame = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(animFrame);
	});

	onDestroy(() => {
		if (animFrame) cancelAnimationFrame(animFrame);
	});

	const half = $derived(size / 2);
</script>

<div
	bind:this={containerEl}
	class="cube-scene select-none"
	style="width: {size * 1.8}px; height: {size * 1.8}px; perspective: {size * 4}px;"
	onmouseenter={() => (isHovering = true)}
	onmouseleave={() => { isHovering = false; startTime = 0; }}
	onmousemove={handleMouseMove}
	role="img"
	aria-label="Kubus 3D interaktif menampilkan tech stack"
>
	<div
		class="cube-body"
		style="
			width: {size}px;
			height: {size}px;
			transform: rotateX({rotX}deg) rotateY({rotY}deg);
		"
	>
		<!-- Front -->
		<div
			class="cube-face bg-gradient-to-br {faces[0].bg} {faces[0].border}"
			style="transform: translateZ({half}px);"
		>
			<span class="text-2xl sm:text-3xl">{faces[0].icon}</span>
			<span class="font-mono text-xs font-bold {faces[0].text}">{faces[0].label}</span>
		</div>

		<!-- Back -->
		<div
			class="cube-face bg-gradient-to-br {faces[1].bg} {faces[1].border}"
			style="transform: rotateY(180deg) translateZ({half}px);"
		>
			<span class="text-2xl sm:text-3xl">{faces[1].icon}</span>
			<span class="font-mono text-xs font-bold {faces[1].text}">{faces[1].label}</span>
		</div>

		<!-- Right -->
		<div
			class="cube-face bg-gradient-to-br {faces[2].bg} {faces[2].border}"
			style="transform: rotateY(90deg) translateZ({half}px);"
		>
			<span class="text-2xl sm:text-3xl">{faces[2].icon}</span>
			<span class="font-mono text-xs font-bold {faces[2].text}">{faces[2].label}</span>
		</div>

		<!-- Left -->
		<div
			class="cube-face bg-gradient-to-br {faces[3].bg} {faces[3].border}"
			style="transform: rotateY(-90deg) translateZ({half}px);"
		>
			<span class="text-2xl sm:text-3xl">{faces[3].icon}</span>
			<span class="font-mono text-xs font-bold {faces[3].text}">{faces[3].label}</span>
		</div>

		<!-- Top -->
		<div
			class="cube-face bg-gradient-to-br {faces[4].bg} {faces[4].border}"
			style="transform: rotateX(90deg) translateZ({half}px);"
		>
			<span class="text-2xl sm:text-3xl">{faces[4].icon}</span>
			<span class="font-mono text-xs font-bold {faces[4].text}">{faces[4].label}</span>
		</div>

		<!-- Bottom -->
		<div
			class="cube-face bg-gradient-to-br {faces[5].bg} {faces[5].border}"
			style="transform: rotateX(-90deg) translateZ({half}px);"
		>
			<span class="text-2xl sm:text-3xl">{faces[5].icon}</span>
			<span class="font-mono text-xs font-bold {faces[5].text}">{faces[5].label}</span>
		</div>
	</div>
</div>

<style>
	.cube-scene {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.cube-body {
		position: relative;
		transform-style: preserve-3d;
		transition: transform 0.08s linear;
	}

	.cube-face {
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 6px;
		border: 1px solid;
		border-radius: 12px;
		backdrop-filter: blur(8px);
		backface-visibility: visible;
	}

	:global([data-theme="light"]) .cube-face {
		background-color: rgba(255, 255, 255, 0.55);
	}

	:global([data-theme="dark"]) .cube-face {
		background-color: rgba(30, 30, 30, 0.6);
	}
</style>
