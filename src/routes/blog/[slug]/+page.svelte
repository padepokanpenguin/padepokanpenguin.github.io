<script lang="ts">
	import { onMount } from 'svelte';
	import LanternToggle from '#lib/components/physics/LanternToggle.svelte';
	import PenguinMascot from '#lib/components/physics/PenguinMascot.svelte';
	import DeskBook from '#lib/components/desk/DeskBook.svelte';
	import DeskSticker from '#lib/components/desk/DeskSticker.svelte';
	import { sound } from '#lib/sound/audio';
	import { theme } from '#lib/state/theme.svelte';
	import { visitor } from '#lib/state/visitor.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let isMuted = $state(sound.isMuted);

	function toggleAudio() {
		isMuted = sound.toggle();
	}

	onMount(() => {
		theme.init();
		visitor.init(`padepokanpenguin.github.io/blog/${data.post.slug}`);
	});
</script>

<svelte:head>
	<title>{data.post.title} · Padepokan Penguin</title>
	<meta name="description" content={data.post.summary} />
	<meta name="keywords" content={data.post.tags.join(', ')} />
	<meta name="author" content="Aria Nur Jamal" />
	<link rel="canonical" href="https://padepokanpenguin.github.io/blog/{data.post.slug}" />

	<!-- Open Graph / Facebook -->
	<meta property="og:site_name" content="Padepokan Penguin" />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://padepokanpenguin.github.io/blog/{data.post.slug}" />
	<meta property="og:title" content="{data.post.title} · Padepokan Penguin" />
	<meta property="og:description" content={data.post.summary} />
	<meta property="og:image" content="https://padepokanpenguin.github.io/favicon.svg" />
	<meta property="og:locale" content="id_ID" />
	<meta property="article:published_time" content="{data.post.date}" />
	<meta property="article:author" content="Aria Nur Jamal" />
	{#each data.post.tags as tag}
		<meta property="article:tag" content={tag} />
	{/each}

	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@aria_nur_jamal" />
	<meta name="twitter:creator" content="@aria_nur_jamal" />
	<meta name="twitter:title" content="{data.post.title} · Padepokan Penguin" />
	<meta name="twitter:description" content={data.post.summary} />
	<meta name="twitter:image" content="https://padepokanpenguin.github.io/favicon.svg" />

	<!-- Structured Data (JSON-LD Schema.org) -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		'headline': data.post.title,
		'description': data.post.summary,
		'datePublished': data.post.date,
		'author': {
			'@type': 'Person',
			'name': 'Aria Nur Jamal',
			'url': 'https://padepokanpenguin.github.io/'
		},
		'publisher': {
			'@type': 'Organization',
			'name': 'Padepokan Penguin',
			'logo': {
				'@type': 'ImageObject',
				'url': 'https://padepokanpenguin.github.io/favicon.svg'
			}
		},
		'mainEntityOfPage': {
			'@type': 'WebPage',
			'@id': `https://padepokanpenguin.github.io/blog/${data.post.slug}`
		},
		'keywords': data.post.tags.join(', ')
	})}</script>`}
</svelte:head>

<div
	class="relative min-h-screen bg-[#F5F4EF] dark:bg-[#0D1117] text-stone-900 dark:text-stone-100 desk-pattern transition-colors duration-300 overflow-x-hidden flex flex-col justify-between"
>
	<!-- Main Navigation / Status Bar -->
	<header class="max-w-6xl w-full mx-auto px-3 sm:px-8 pt-4 sm:pt-5 pb-2 flex items-center justify-between gap-2">
		<div class="flex items-center gap-2 sm:gap-3 min-w-0 shrink">
			<a
				href="/"
				class="group flex items-center gap-2 sm:gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-0.5 sm:p-1 min-w-0"
			>
				<div class="w-8 h-8 rounded-xl bg-amber-400 dark:bg-amber-500 border border-amber-600 flex items-center justify-center font-mono font-bold text-stone-900 shadow-sm group-hover:scale-105 transition-transform shrink-0">
					🐧
				</div>
				<div class="min-w-0">
					<span class="font-fraunces font-bold text-base sm:text-lg text-stone-900 dark:text-stone-50 block leading-tight truncate">
						Padepokan Penguin
					</span>
					<span class="font-mono text-[10px] sm:text-[11px] text-stone-500 dark:text-stone-400 block truncate">
						padepokanpenguin.github.io
					</span>
				</div>
			</a>
		</div>

		<!-- Right Controls: Tactile Lantern, Audio, GitHub -->
		<div class="flex items-center gap-1.5 sm:gap-3 shrink-0">
			<LanternToggle />

			<button
				type="button"
				class="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm text-xs font-mono text-stone-700 dark:text-stone-300 hover:border-amber-400 transition-colors shadow-sm cursor-pointer shrink-0"
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
				class="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm text-xs font-mono font-semibold text-stone-700 dark:text-stone-300 hover:border-amber-400 transition-colors shadow-sm shrink-0 whitespace-nowrap"
				aria-label="Kunjungi profil GitHub Padepokan Penguin"
			>
				<svg class="w-3.5 h-3.5 shrink-0 fill-current" viewBox="0 0 24 24">
					<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
				</svg>
				<span>GitHub</span>
				<span class="hidden sm:inline">↗</span>
			</a>
		</div>
	</header>

	<!-- Desk Workbench Main Canvas Area -->
	<main class="relative max-w-6xl w-full mx-auto px-3 sm:px-8 py-4 sm:py-6 my-auto">
		<div class="block pointer-events-auto">
			<DeskSticker
				initialX={-20}
				initialY={20}
				initialRot={-6}
				label="LINUX INSIDE"
				subtext="Kekuatan Open Source"
				variant="stamp"
				colorClass="bg-sky-50 dark:bg-sky-950/70 border-sky-400 text-sky-900 dark:text-sky-200"
			/>
			<DeskSticker
				initialX={840}
				initialY={40}
				initialRot={6}
				label="SVELTE 5"
				subtext="Zero Virtual DOM"
				variant="stamp"
				colorClass="bg-orange-50 dark:bg-orange-950/70 border-orange-400 text-orange-900 dark:text-orange-200"
			/>
			<DeskSticker
				initialX={860}
				initialY={240}
				initialRot={-4}
				label="CRAFT OVER SLOP"
				variant="tape"
			/>
		</div>

		<!-- Central Workbench Content -->
		<div class="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 z-20 relative">
			<div class="w-full flex-1">
				<DeskBook initialPost={data.post} initialTab="blog" />
			</div>

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
		<div class="flex items-center gap-3 flex-wrap">
			<div class="flex items-center gap-2">
				<span>Ditempa oleh</span>
				<strong class="font-bold text-stone-700 dark:text-stone-300">Padepokan Penguin</strong>
				<span>© 2026</span>
			</div>
			<span class="hidden sm:inline text-stone-300 dark:text-stone-700">·</span>
			<div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-200/50 dark:bg-stone-800/60 border border-stone-300/60 dark:border-stone-700/60 text-[11px] text-stone-600 dark:text-stone-300 shadow-xs" title="Total Pengunjung Situs">
				<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true"></span>
				<span>{(visitor.count ?? 1).toLocaleString('id-ID')} Pengunjung</span>
			</div>
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
