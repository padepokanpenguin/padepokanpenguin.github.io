<script lang="ts">
	import { onMount } from 'svelte';
	import { sound } from '#lib/sound/audio';

	interface Props {
		initialX?: number;
		initialY?: number;
		initialRot?: number;
		label: string;
		subtext?: string;
		variant?: 'stamp' | 'badge' | 'tape' | 'polaroid';
		colorClass?: string;
	}

	let {
		initialX = 40,
		initialY = 40,
		initialRot = 0,
		label,
		subtext,
		variant = 'badge',
		colorClass = 'bg-amber-100 border-amber-300 text-amber-900'
	}: Props = $props();

	let posX = $state(40);
	let posY = $state(40);
	let rotation = $state(0);
	let isDragging = $state(false);
	let currentZ = $state(25);
	let startPointer = { x: 0, y: 0 };
	let startPos = { x: 0, y: 0 };

	onMount(() => {
		if (typeof window !== 'undefined') {
			// Clamp posisi X agar tidak keluar batas kiri (min 12px) maupun kanan layar
			const maxSafeX = Math.max(16, window.innerWidth - 180);
			posX = Math.min(Math.max(12, initialX), maxSafeX);
			posY = Math.max(12, initialY);
			rotation = initialRot;
		}
	});

	function onPointerDown(e: PointerEvent) {
		isDragging = true;
		currentZ = 60; // Lift above all content when grabbed
		startPointer = { x: e.clientX, y: e.clientY };
		startPos = { x: posX, y: posY };
		try {
			(e.currentTarget as HTMLElement)?.setPointerCapture?.(e.pointerId);
		} catch {}
	}

	function onPointerMove(e: PointerEvent) {
		if (!isDragging) return;
		const dx = e.clientX - startPointer.x;
		const dy = e.clientY - startPointer.y;
		posX = startPos.x + dx;
		posY = startPos.y + dy;
	}

	function onPointerUp(e: PointerEvent) {
		if (!isDragging) return;
		isDragging = false;
		currentZ = 30;
		try {
			(e.currentTarget as HTMLElement)?.releasePointerCapture?.(e.pointerId);
		} catch {}
		sound.playThud();
	}
</script>

<div
	role="button"
	tabindex="0"
	aria-label="Stiker meja draggable: {label}"
	class="absolute touch-none select-none cursor-grab active:cursor-grabbing transition-transform duration-75 {isDragging ? 'scale-110 shadow-2xl' : 'hover:scale-105'}"
	style="transform: translate3d({posX}px, {posY}px, 0) rotate({isDragging ? 0 : rotation}deg); z-index: {currentZ};"
	onpointerdown={onPointerDown}
	onpointermove={onPointerMove}
	onpointerup={onPointerUp}
	onpointercancel={onPointerUp}
	onkeydown={(e) => {
		if (['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
			e.preventDefault();
			e.stopPropagation(); // Mencegah tab DeskBook ikut berpindah saat menggeser stiker
		}
		if (e.key === 'ArrowRight') posX += 12;
		if (e.key === 'ArrowLeft') posX -= 12;
		if (e.key === 'ArrowDown') posY += 12;
		if (e.key === 'ArrowUp') posY -= 12;
	}}
>
	{#if variant === 'stamp'}
		<div
			class="px-3.5 py-2.5 sm:px-4 sm:py-3 border-2 border-dashed rounded-xl font-mono text-[11px] sm:text-xs uppercase tracking-wider font-bold shadow-md hover:shadow-lg transition-transform {colorClass}"
		>
			<div class="flex items-center gap-1.5 justify-center">
				<span class="w-2 h-2 rounded-full bg-current"></span>
				<span>{label}</span>
			</div>
			{#if subtext}
				<div class="text-[9px] sm:text-[10px] opacity-75 text-center mt-0.5">{subtext}</div>
			{/if}
		</div>
	{:else if variant === 'tape'}
		<div
			class="px-3 py-1 bg-amber-200/80 dark:bg-amber-900/50 text-stone-800 dark:text-stone-200 border-t border-b border-amber-300/60 font-caveat text-sm font-semibold shadow-sm backdrop-blur-[1px]"
		>
			📌 {label}
		</div>
	{:else}
		<!-- Default Badge -->
		<div
			class="px-3 py-1.5 rounded-lg border font-mono text-xs font-semibold shadow-sm hover:shadow-md transition-all {colorClass}"
		>
			<span>{label}</span>
			{#if subtext}
				<span class="ml-1 text-[10px] opacity-80">({subtext})</span>
			{/if}
		</div>
	{/if}
</div>
