<script lang="ts">
	import { onMount } from 'svelte';
	import LanternToggle from '#lib/components/physics/LanternToggle.svelte';
	import PenguinMascot from '#lib/components/physics/PenguinMascot.svelte';
	import DeskBook from '#lib/components/desk/DeskBook.svelte';
	import DeskSticker from '#lib/components/desk/DeskSticker.svelte';
	import { sound } from '#lib/sound/audio';
	import { theme } from '#lib/state/theme.svelte';

	let isMuted = $state(sound.isMuted);

	function toggleAudio() {
		isMuted = sound.toggle();
	}

	onMount(() => {
		theme.init();
	});
</script>

<svelte:head>
	<title>Padepokan Penguin · Creative Engineering & Physics UI</title>
</svelte:head>

<div
	class="relative min-h-screen bg-[#F5F4EF] dark:bg-[#0D1117] text-stone-900 dark:text-stone-100 desk-pattern transition-colors duration-300 overflow-x-hidden flex flex-col justify-between"
>
	<!-- Main Navigation / Status Bar -->
	<header class="max-w-6xl w-full mx-auto px-4 sm:px-8 pt-5 pb-2 flex items-center justify-between">
		<div class="flex items-center gap-3">
			<a
				href="/"
				class="group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
			>
				<div class="w-8 h-8 rounded-xl bg-amber-400 dark:bg-amber-500 border border-amber-600 flex items-center justify-center font-mono font-bold text-stone-900 shadow-sm group-hover:scale-105 transition-transform">
					🐧
				</div>
				<div>
					<span class="font-fraunces font-bold text-lg text-stone-900 dark:text-stone-50 block leading-tight">
						Padepokan Penguin
					</span>
					<span class="font-mono text-[11px] text-stone-500 dark:text-stone-400 block">
						padepokanpenguin.github.io
					</span>
				</div>
			</a>
		</div>

		<!-- Right Controls: Tactile Lantern, Audio, GitHub -->
		<div class="flex items-center gap-2 sm:gap-3">
			<!-- Tactile Lantern Theme Switch -->
			<LanternToggle />

			<button
				type="button"
				class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm text-xs font-mono text-stone-700 dark:text-stone-300 hover:border-amber-400 transition-colors shadow-sm cursor-pointer"
				onclick={toggleAudio}
				aria-label={isMuted ? 'Aktifkan Efek Suara' : 'Bisukan Efek Suara'}
			>
				<span>{isMuted ? '🔇' : '🔊'}</span>
				<span class="hidden sm:inline">{isMuted ? 'Suara Mati' : 'Suara Aktif'}</span>
			</button>

			<a
				href="https://github.com/padepokanpenguin"
				target="_blank"
				rel="noreferrer"
				class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm text-xs font-mono font-semibold text-stone-700 dark:text-stone-300 hover:border-amber-400 transition-colors shadow-sm"
			>
				<span>GitHub</span>
				<span>↗</span>
			</a>
		</div>
	</header>

	<!-- Desk Workbench Main Canvas Area -->
	<main class="relative max-w-6xl w-full mx-auto px-3 sm:px-8 py-4 sm:py-6 my-auto">
		<!-- Desktop Draggable Stickers (Free-floating on workbench) -->
		<div class="hidden lg:block pointer-events-auto">
			<DeskSticker
				initialX={-40}
				initialY={30}
				initialRot={-6}
				label="LINUX INSIDE"
				subtext="Kekuatan Open Source"
				variant="stamp"
				colorClass="bg-sky-50 dark:bg-sky-950/70 border-sky-400 text-sky-900 dark:text-sky-200"
			/>

			<DeskSticker
				initialX={920}
				initialY={140}
				initialRot={8}
				label="SVELTE 5"
				subtext="Zero Virtual DOM"
				variant="stamp"
				colorClass="bg-orange-50 dark:bg-orange-950/70 border-orange-400 text-orange-900 dark:text-orange-200"
			/>

			<DeskSticker
				initialX={960}
				initialY={320}
				initialRot={-4}
				label="CRAFT OVER SLOP"
				variant="tape"
			/>
		</div>

		<!-- Central Workbench Content -->
		<div class="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 z-20 relative">
			<!-- The Interactive DeskBook (Primary Focus) -->
			<div class="w-full flex-1">
				<DeskBook />
			</div>

			<!-- Companion Mascot Column -->
			<aside class="flex flex-col items-center justify-center p-4 rounded-3xl bg-white/40 dark:bg-stone-800/30 border border-stone-200/80 dark:border-stone-700/60 backdrop-blur-sm shadow-sm" aria-label="Maskot Padepokan">
				<div class="text-[11px] font-mono text-stone-500 dark:text-stone-400 mb-2 uppercase tracking-wider">
					Pendekar Maskot
				</div>
				<PenguinMascot />
			</aside>
		</div>
	</main>

	<!-- Footer -->
	<footer class="max-w-6xl w-full mx-auto px-4 sm:px-8 py-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-stone-500 dark:text-stone-400 border-t border-stone-200/60 dark:border-stone-800/60">
		<div class="flex items-center gap-2">
			<span>Ditempa oleh</span>
			<strong class="font-bold text-stone-700 dark:text-stone-300">Padepokan Penguin</strong>
			<span>© 2026</span>
		</div>
		<div class="flex items-center gap-4">
			<span>dibuat dengan Svelte 5 + motion</span>
			<span>·</span>
			<a
				href="https://github.com/padepokanpenguin/padepokanpenguin.github.io"
				target="_blank"
				rel="noreferrer"
				class="hover:text-amber-600 dark:hover:text-amber-400 underline underline-offset-2"
			>
				Source Code
			</a>
		</div>
	</footer>
</div>
