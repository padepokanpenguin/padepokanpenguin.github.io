<script lang="ts">
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

	$effect.pre(() => {
		posX = initialX;
		posY = initialY;
		rotation = initialRot;
	});
	let isDragging = $state(false);
	let startPointer = { x: 0, y: 0 };
	let startPos = { x: 0, y: 0 };

	function onPointerDown(e: PointerEvent) {
		isDragging = true;
		startPointer = { x: e.clientX, y: e.clientY };
		startPos = { x: posX, y: posY };
		(e.target as HTMLElement)?.setPointerCapture?.(e.pointerId);
	}

	function onPointerMove(e: PointerEvent) {
		if (!isDragging) return;
		const dx = e.clientX - startPointer.x;
		const dy = e.clientY - startPointer.y;
		posX = startPos.x + dx;
		posY = startPos.y + dy;
	}

	function onPointerUp() {
		if (!isDragging) return;
		isDragging = false;
		sound.playThud();
	}
</script>

<div
	role="button"
	tabindex="0"
	aria-label="Stiker meja draggable: {label}"
	class="absolute z-10 touch-none select-none cursor-grab active:cursor-grabbing transition-shadow duration-150"
	style="transform: translate3d({posX}px, {posY}px, 0) rotate({rotation}deg);"
	onpointerdown={onPointerDown}
	onpointermove={onPointerMove}
	onpointerup={onPointerUp}
	onpointercancel={onPointerUp}
	onkeydown={(e) => {
		if (e.key === 'ArrowRight') posX += 10;
		if (e.key === 'ArrowLeft') posX -= 10;
		if (e.key === 'ArrowDown') posY += 10;
		if (e.key === 'ArrowUp') posY -= 10;
	}}
>
	{#if variant === 'stamp'}
		<div
			class="px-4 py-3 border-2 border-dashed rounded-xl font-mono text-xs uppercase tracking-wider font-bold shadow-md hover:shadow-lg transition-transform hover:scale-105 {colorClass}"
		>
			<div class="flex items-center gap-1.5 justify-center">
				<span class="w-2 h-2 rounded-full bg-current"></span>
				<span>{label}</span>
			</div>
			{#if subtext}
				<div class="text-[10px] opacity-75 text-center mt-0.5">{subtext}</div>
			{/if}
		</div>
	{:else if variant === 'tape'}
		<div
			class="px-3 py-1 bg-amber-200/80 dark:bg-amber-900/40 text-stone-800 dark:text-stone-200 border-t border-b border-amber-300/60 font-caveat text-sm font-semibold shadow-sm backdrop-blur-[1px]"
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
