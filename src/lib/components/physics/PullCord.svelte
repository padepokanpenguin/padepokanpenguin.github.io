<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { theme } from '#lib/state/theme.svelte';
	import { sound } from '#lib/sound/audio';

	interface Point {
		x: number;
		y: number;
		oldX: number;
		oldY: number;
		pinned: boolean;
	}

	const NUM_POINTS = 8;
	const SEGMENT_LEN = 14;
	const PULL_THRESHOLD = 65;

	let canvas: HTMLCanvasElement | null = $state(null);
	let isDragging = $state(false);
	let hasFiredThisPull = $state(false);
	let animationFrameId: number;

	const points: Point[] = [];
	const anchorX = 40;
	const anchorY = 0;

	for (let i = 0; i < NUM_POINTS; i++) {
		points.push({
			x: anchorX,
			y: anchorY + i * SEGMENT_LEN,
			oldX: anchorX,
			oldY: anchorY + i * SEGMENT_LEN,
			pinned: i === 0
		});
	}

	function updatePhysics() {
		const gravity = 0.55;
		const friction = 0.985;

		for (let i = 0; i < points.length; i++) {
			const p = points[i];
			if (p.pinned) continue;
			if (i === points.length - 1 && isDragging) continue;

			const vx = (p.x - p.oldX) * friction;
			const vy = (p.y - p.oldY) * friction + gravity;

			p.oldX = p.x;
			p.oldY = p.y;
			p.x += vx;
			p.y += vy;
		}

		// Relax constraints (3 iterations for stiff rope behavior)
		for (let iter = 0; iter < 3; iter++) {
			for (let i = 0; i < points.length - 1; i++) {
				const p1 = points[i];
				const p2 = points[i + 1];
				const dx = p2.x - p1.x;
				const dy = p2.y - p1.y;
				const dist = Math.hypot(dx, dy);
				if (dist === 0) continue;
				const diff = (dist - SEGMENT_LEN) / dist;

				if (!p1.pinned) {
					p1.x += dx * 0.5 * diff;
					p1.y += dy * 0.5 * diff;
				}
				if (!p2.pinned && !(i + 1 === points.length - 1 && isDragging)) {
					p2.x -= dx * 0.5 * diff;
					p2.y -= dy * 0.5 * diff;
				}
			}
		}
	}

	function render() {
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const isDark = theme.current === 'dark';
		const ropeColor = isDark ? '#94A3B8' : '#78716C';
		const handleColor = isDark ? '#F59E0B' : '#D97706';
		const highlightColor = isDark ? '#FCD34D' : '#FDE68A';

		// Draw beaded cord
		ctx.beginPath();
		ctx.moveTo(points[0].x, points[0].y);
		for (let i = 1; i < points.length; i++) {
			ctx.lineTo(points[i].x, points[i].y);
		}
		ctx.strokeStyle = ropeColor;
		ctx.lineWidth = 2.5;
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
		ctx.stroke();

		// Draw tiny beads along the chain
		for (let i = 1; i < points.length - 1; i++) {
			ctx.beginPath();
			ctx.arc(points[i].x, points[i].y, 2.2, 0, Math.PI * 2);
			ctx.fillStyle = ropeColor;
			ctx.fill();
		}

		// Draw brass/metallic pull handle at the bottom
		const last = points[points.length - 1];
		ctx.save();
		ctx.translate(last.x, last.y);

		// Handle drop-shadow
		ctx.shadowColor = isDark ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.18)';
		ctx.shadowBlur = 6;
		ctx.shadowOffsetY = 3;

		// Brass bell body
		ctx.beginPath();
		ctx.ellipse(0, 7, 7, 10, 0, 0, Math.PI * 2);
		ctx.fillStyle = handleColor;
		ctx.fill();

		// Inner highlight
		ctx.beginPath();
		ctx.ellipse(-2, 5, 2.5, 5, 0, 0, Math.PI * 2);
		ctx.fillStyle = highlightColor;
		ctx.fill();

		// Grip ring
		ctx.beginPath();
		ctx.arc(0, 18, 5, 0, Math.PI * 2);
		ctx.lineWidth = 2;
		ctx.strokeStyle = handleColor;
		ctx.stroke();

		ctx.restore();
	}

	function loop() {
		updatePhysics();
		render();
		animationFrameId = requestAnimationFrame(loop);
	}

	function onPointerDown(e: PointerEvent) {
		const rect = canvas?.getBoundingClientRect();
		if (!rect) return;
		const mx = e.clientX - rect.left;
		const my = e.clientY - rect.top;
		const last = points[points.length - 1];

		// Check hit on pull handle
		if (Math.hypot(mx - last.x, my - (last.y + 10)) < 28) {
			isDragging = true;
			hasFiredThisPull = false;
			(e.target as HTMLElement)?.setPointerCapture?.(e.pointerId);
		}
	}

	function onPointerMove(e: PointerEvent) {
		if (!isDragging || !canvas) return;
		const rect = canvas.getBoundingClientRect();
		const mx = e.clientX - rect.left;
		const my = e.clientY - rect.top;

		const last = points[points.length - 1];
		last.x = Math.max(10, Math.min(canvas.width - 10, mx));
		last.y = Math.max(NUM_POINTS * 8, Math.min(canvas.height - 25, my));

		// Check displacement for switch snap
		const defaultY = NUM_POINTS * SEGMENT_LEN;
		if (last.y - defaultY > PULL_THRESHOLD && !hasFiredThisPull) {
			hasFiredThisPull = true;
			theme.toggle();
			sound.playSwitchClick(theme.current === 'dark');
		}
	}

	function onPointerUp() {
		if (!isDragging) return;
		isDragging = false;
		const last = points[points.length - 1];
		// Give a quick spring nudge upwards
		last.oldY = last.y + 18;
		sound.playThud();
	}

	function handleKeyboardToggle(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			theme.toggle();
			sound.playSwitchClick(theme.current === 'dark');
			// Agitate cord visually
			const last = points[points.length - 1];
			last.oldY = last.y + 25;
		}
	}

	onMount(() => {
		theme.init();
		loop();
	});

	onDestroy(() => {
		if (typeof cancelAnimationFrame !== 'undefined') {
			cancelAnimationFrame(animationFrameId);
		}
	});
</script>

<aside aria-label="Pengaturan Tema" class="relative select-none">
	<canvas
		bind:this={canvas}
		width="80"
		height="220"
		class="block cursor-grab active:cursor-grabbing touch-none"
		onpointerdown={onPointerDown}
		onpointermove={onPointerMove}
		onpointerup={onPointerUp}
		onpointercancel={onPointerUp}
	></canvas>

	<!-- Accessibility Keyboard Button -->
	<button
		type="button"
		class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:right-2 focus:z-50 focus:px-3 focus:py-1.5 focus:bg-amber-500 focus:text-slate-900 focus:rounded-md focus:font-mono focus:text-xs focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
		onclick={() => {
			theme.toggle();
			sound.playSwitchClick(theme.current === 'dark');
		}}
		onkeydown={handleKeyboardToggle}
	>
		Toggle Tema ({theme.current === 'dark' ? 'Gelap' : 'Terang'})
	</button>

	<!-- Hand-drawn Annotation Doodle -->
	<div
		class="pointer-events-none absolute top-28 left-16 w-32 hidden sm:flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 font-caveat text-base leading-none transition-opacity duration-300"
		class:opacity-40={isDragging}
	>
		<svg class="w-5 h-5 -rotate-45 shrink-0 stroke-current" viewBox="0 0 24 24" fill="none">
			<path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
		<span>Tarik talinya!</span>
	</div>
</aside>
