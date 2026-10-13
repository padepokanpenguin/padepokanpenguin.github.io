<script lang="ts">
	import { onMount } from 'svelte';
	import { Spring } from 'svelte/motion';
	import { sound } from '#lib/sound/audio';

	// Svelte 5 Spring physics for eye tracking
	const eyeSpring = new Spring({ x: 0, y: 0 }, { stiffness: 0.12, damping: 0.55 });
	const bodySpring = new Spring({ scaleX: 1, scaleY: 1, rot: 0 }, { stiffness: 0.2, damping: 0.45 });

	let isBlinking = $state(false);
	let speechBubble = $state<string | null>(null);
	let speechTimeout: number | undefined;

	const dialogueOptions = [
		'Waddle on! 🐧',
		'Selamat datang di Padepokan!',
		'Crafting with Svelte 5 ✨',
		'Linux-powered spirit ⚡',
		'Physics feels good!',
		'Code. Learn. Meditate. 🥋'
	];

	function handleMouseMove(e: MouseEvent) {
		const targetX = (e.clientX / window.innerWidth - 0.5) * 14;
		const targetY = (e.clientY / window.innerHeight - 0.5) * 10;
		eyeSpring.target = { x: targetX, y: targetY };
		bodySpring.target = {
			scaleX: 1,
			scaleY: 1,
			rot: (e.clientX / window.innerWidth - 0.5) * 8
		};
	}

	function handleClick() {
		sound.playChirp();

		// Squash and stretch spring excitation
		bodySpring.set({ scaleX: 1.25, scaleY: 0.75, rot: -12 });
		setTimeout(() => {
			bodySpring.target = { scaleX: 0.9, scaleY: 1.15, rot: 6 };
			setTimeout(() => {
				bodySpring.target = { scaleX: 1, scaleY: 1, rot: 0 };
			}, 150);
		}, 80);

		// Random reaction speech
		const randomText = dialogueOptions[Math.floor(Math.random() * dialogueOptions.length)];
		speechBubble = randomText;
		if (speechTimeout) clearTimeout(speechTimeout);
		speechTimeout = window.setTimeout(() => {
			speechBubble = null;
		}, 2600);
	}

	onMount(() => {
		window.addEventListener('mousemove', handleMouseMove);

		// Natural blinking interval
		const blinkInterval = setInterval(() => {
			isBlinking = true;
			setTimeout(() => {
				isBlinking = false;
			}, 140);
		}, 4200);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			clearInterval(blinkInterval);
			if (speechTimeout) clearTimeout(speechTimeout);
		};
	});
</script>

<div class="relative inline-flex flex-col items-center select-none group">
	<!-- Speech Bubble (Appears on click) -->
	{#if speechBubble}
		<div
			class="absolute -top-12 z-20 px-3 py-1.5 bg-amber-100 dark:bg-stone-800 border-2 border-stone-800 dark:border-amber-400/80 rounded-2xl text-xs font-caveat font-bold text-stone-900 dark:text-stone-100 shadow-md animate-bounce whitespace-nowrap"
		>
			{speechBubble}
			<div
				class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-amber-100 dark:bg-stone-800 border-r-2 border-b-2 border-stone-800 dark:border-amber-400/80 rotate-45"
			></div>
		</div>
	{/if}

	<!-- Mascot Interactive Character -->
	<button
		type="button"
		class="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-full cursor-pointer p-1"
		onclick={handleClick}
		aria-label="Klik Maskot Penguin Padepokan"
	>
		<svg
			viewBox="0 0 120 130"
			class="w-24 h-26 transition-transform drop-shadow-md hover:drop-shadow-lg"
			style="transform: scale({bodySpring.current.scaleX}, {bodySpring.current.scaleY}) rotate({bodySpring.current.rot}deg);"
		>
			<!-- Penguin Body Shadow -->
			<ellipse cx="60" cy="122" rx="36" ry="8" class="fill-stone-900/15 dark:fill-black/35" />

			<!-- Feet -->
			<ellipse cx="44" cy="116" rx="14" ry="6" class="fill-amber-500 dark:fill-amber-600" />
			<ellipse cx="76" cy="116" rx="14" ry="6" class="fill-amber-500 dark:fill-amber-600" />

			<!-- Outer Dark Body -->
			<path
				d="M 60,12 C 32,12 22,38 22,76 C 22,108 34,116 60,116 C 86,116 98,108 98,76 C 98,38 88,12 60,12 Z"
				class="fill-stone-900 dark:fill-stone-800 transition-colors"
			/>

			<!-- White Belly -->
			<path
				d="M 60,34 C 42,34 36,54 36,80 C 36,104 46,110 60,110 C 74,110 84,104 84,80 C 84,54 78,34 60,34 Z"
				class="fill-stone-50 dark:fill-stone-200 transition-colors"
			/>

			<!-- Flippers (Wings) -->
			<path
				d="M 23,54 C 14,64 12,82 18,90 C 22,86 24,74 25,60 Z"
				class="fill-stone-900 dark:fill-stone-800"
			/>
			<path
				d="M 97,54 C 106,64 108,82 102,90 C 98,86 96,74 95,60 Z"
				class="fill-stone-900 dark:fill-stone-800"
			/>

			<!-- Beak -->
			<polygon
				points="60,60 52,50 68,50"
				class="fill-amber-500 dark:fill-amber-400 stroke-amber-600 dark:stroke-amber-500 stroke-1"
			/>

			<!-- Left Eye -->
			<g transform="translate(48, 42)">
				<ellipse cx="0" cy="0" rx="8" ry="10" class="fill-stone-50" />
				{#if isBlinking}
					<line x1="-6" y1="0" x2="6" y2="0" class="stroke-stone-900 stroke-2" />
				{:else}
					<circle
						cx={Math.max(-4, Math.min(4, eyeSpring.current.x * 0.4))}
						cy={Math.max(-4, Math.min(4, eyeSpring.current.y * 0.4))}
						r="4"
						class="fill-stone-900"
					/>
					<circle
						cx={Math.max(-4, Math.min(4, eyeSpring.current.x * 0.4)) - 1.2}
						cy={Math.max(-4, Math.min(4, eyeSpring.current.y * 0.4)) - 1.2}
						r="1.3"
						class="fill-stone-50"
					/>
				{/if}
			</g>

			<!-- Right Eye -->
			<g transform="translate(72, 42)">
				<ellipse cx="0" cy="0" rx="8" ry="10" class="fill-stone-50" />
				{#if isBlinking}
					<line x1="-6" y1="0" x2="6" y2="0" class="stroke-stone-900 stroke-2" />
				{:else}
					<circle
						cx={Math.max(-4, Math.min(4, eyeSpring.current.x * 0.4))}
						cy={Math.max(-4, Math.min(4, eyeSpring.current.y * 0.4))}
						r="4"
						class="fill-stone-900"
					/>
					<circle
						cx={Math.max(-4, Math.min(4, eyeSpring.current.x * 0.4)) - 1.2}
						cy={Math.max(-4, Math.min(4, eyeSpring.current.y * 0.4)) - 1.2}
						r="1.3"
						class="fill-stone-50"
					/>
				{/if}
			</g>

			<!-- Tiny Martial Arts Headband (Padepokan signature!) -->
			<path
				d="M 32,28 Q 60,32 88,28"
				class="stroke-rose-600 dark:stroke-rose-500 fill-none"
				stroke-width="5"
				stroke-linecap="round"
			/>
			<circle cx="60" cy="30" r="3.5" class="fill-amber-400 stroke-rose-600 stroke-1" />
		</svg>
	</button>

	<span class="mt-1 text-xs font-caveat text-stone-500 dark:text-stone-400 select-none">
		Pet or click me!
	</span>
</div>
