<script lang="ts">
	import { profile, calculateExperienceYears } from '#lib/data/profile';
	import { projects } from '#lib/data/projects';
	import { blogPosts, type BlogPost } from '#lib/data/blogs';
	import { challenges, type Challenge } from '#lib/data/challenges';
	import NgodeRunner from '#lib/components/desk/NgodeRunner.svelte';
	import { sound } from '#lib/sound/audio';
	import { articleReaders } from '#lib/state/articleReaders.svelte';
	import { marked } from 'marked';
	import Scribble from '#lib/components/ui/Scribble.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	function renderMarkdown(content: string): string {
		try {
			return marked.parse(content, { gfm: true, breaks: true }) as string;
		} catch {
			return content;
		}
	}
	interface Props {
		initialPost?: BlogPost | null;
		initialTab?: 'bio' | 'projects' | 'blog' | 'lab' | 'ngode' | 'contact';
	}
	let { initialPost = null, initialTab = 'bio' }: Props = $props();

	let activeTab = $state<'bio' | 'projects' | 'blog' | 'lab' | 'ngode' | 'contact'>(initialTab);
	let hoveredProject = $state<string | null>(null);
	let hoveredBlog = $state<string | null>(null);
	let selectedPost = $state<BlogPost | null>(initialPost);
	let selectedTag = $state<string | null>(null);
	let selectedChallenge = $state<Challenge | null>(null);
	let selectedCategory = $state<string | null>(null);
	let experienceYears = $state(calculateExperienceYears());
	$effect(() => {
		if (initialPost) selectedPost = initialPost;
		if (initialTab) activeTab = initialTab;
	});

	const tabs = [
		{ id: 'bio', label: '🥋 Padepokan', title: 'Tentang & Filosofi' },
		{ id: 'projects', label: '📦 Karya', title: 'Koleksi Proyek' },
		{ id: 'blog', label: '📝 Coretan', title: 'Catatan & Coretan' },
		{ id: 'lab', label: '🧪 Lab Taktil', title: 'Eksperimen Interaktif' },
		{ id: 'ngode', label: '🏋️ Ngode', title: 'Gym Algoritma & Soal Koding' },
		{ id: 'contact', label: '📡 Markas', title: 'Kanal & Kontak' }
	] as const;
	onMount(() => {
		articleReaders.init();
		experienceYears = calculateExperienceYears();
		if (selectedPost) {
			articleReaders.recordView(selectedPost.slug);
		}

		if (typeof window !== 'undefined') {
			const applyHash = () => {
				if (window.location.pathname.startsWith('/blog/')) return;
				const hash = window.location.hash.replace('#', '') as typeof activeTab;
				if (hash && ['bio', 'projects', 'blog', 'lab', 'ngode', 'contact'].includes(hash)) {
					activeTab = hash;
					selectedPost = null;
					selectedChallenge = null;
				}
			};
			applyHash();
			window.addEventListener('hashchange', applyHash);
			return () => window.removeEventListener('hashchange', applyHash);
		}
	});

	function openPost(post: BlogPost) {
		selectedPost = post;
		articleReaders.recordView(post.slug);
		sound.playPaperTurn();
	}

	function setTab(id: typeof activeTab) {
		if (activeTab === id && !selectedPost && !selectedChallenge) return;
		activeTab = id;
		selectedPost = null;
		selectedChallenge = null;
		sound.playPaperTurn();

		if (typeof window !== 'undefined') {
			if (window.location.pathname.startsWith('/blog/')) {
				goto('/#' + id);
			} else {
				window.history.replaceState(null, '', '#' + id);
			}
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.target instanceof HTMLElement && (e.target.getAttribute('role') === 'button' || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
		const order: Array<typeof activeTab> = ['bio', 'projects', 'blog', 'lab', 'ngode', 'contact'];
		const idx = order.indexOf(activeTab);
		if (e.key === 'ArrowRight' && idx < order.length - 1) {
			setTab(order[idx + 1]);
		} else if (e.key === 'ArrowLeft' && idx > 0) {
			setTab(order[idx - 1]);
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />
<svelte:head>
	{#if selectedPost}
		<title>{selectedPost.title} · Padepokan Penguin</title>
		<meta name="description" content={selectedPost.summary} />
		<link rel="canonical" href="https://padepokanpenguin.github.io/blog/{selectedPost.slug}" />
		<meta property="og:title" content="{selectedPost.title} · Padepokan Penguin" />
		<meta property="og:description" content={selectedPost.summary} />
		<meta property="og:type" content="article" />
		<meta property="og:url" content="https://padepokanpenguin.github.io/blog/{selectedPost.slug}" />
		<meta property="article:published_time" content="{selectedPost.date}" />
		<meta property="article:author" content="Aria Nur Jamal" />
		{#each selectedPost.tags as tag}
			<meta property="article:tag" content={tag} />
		{/each}
		<meta name="twitter:title" content="{selectedPost.title} · Padepokan Penguin" />
		<meta name="twitter:description" content={selectedPost.summary} />
		{@html `<script type="application/ld+json">${JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'BlogPosting',
			'headline': selectedPost.title,
			'description': selectedPost.summary,
			'datePublished': selectedPost.date,
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
				'@id': `https://padepokanpenguin.github.io/blog/${selectedPost.slug}`
			},
			'keywords': selectedPost.tags.join(', ')
		})}</script>`}
	{/if}
</svelte:head>

<section
	class="relative w-full max-w-4xl mx-auto rounded-3xl bg-stone-50 dark:bg-stone-900/90 border-2 border-stone-300 dark:border-stone-800 shadow-2xl overflow-hidden transition-colors duration-300"
>
	<!-- Top Spiral / Header Bar with Book Tabs -->
	<header class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 px-3 sm:px-6 py-3 sm:py-4 border-b-2 border-stone-200 dark:border-stone-800 bg-stone-100/70 dark:bg-stone-900/70">
		<div class="flex items-center justify-between w-full sm:w-auto">
			<div class="flex items-center gap-2">
				<!-- Visual Spiral Binding dots -->
				<div class="flex gap-1.5 mr-2 sm:mr-3">
					<span class="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-stone-300 dark:bg-stone-700 border border-stone-400 dark:border-stone-600"></span>
					<span class="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-stone-300 dark:bg-stone-700 border border-stone-400 dark:border-stone-600"></span>
					<span class="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-stone-300 dark:bg-stone-700 border border-stone-400 dark:border-stone-600"></span>
				</div>
				<span class="font-mono text-[11px] sm:text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
					Padepokan Archive
				</span>
			</div>
			<span class="sm:hidden font-mono text-[10px] text-stone-400">Geser tab ↔</span>
		</div>

		<!-- Interactive Tabs with horizontal scroll on mobile -->
		<nav
			class="w-full sm:w-auto overflow-x-auto flex items-center gap-1 sm:gap-1.5 bg-stone-200/80 dark:bg-stone-800 p-1 rounded-xl relative z-20 touch-pan-x"
			aria-label="Tab Navigasi Buku"
		>
			{#each tabs as tab}
				<button
					type="button"
					class="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono font-semibold whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer {activeTab === tab.id
						? 'bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm'
						: 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'}"
					onclick={() => setTab(tab.id)}
					aria-selected={activeTab === tab.id}
					role="tab"
				>
					{tab.label}
				</button>
			{/each}
		</nav>
	</header>

	<!-- Main Book Content Page -->
	<article class="p-6 sm:p-10 min-h-[460px] bg-stone-50 dark:bg-stone-900/60 font-inter">
		<!-- TAB 1: BIO / PADEPOKAN PHILOSOPHY -->
		{#if activeTab === 'bio'}
			<div id="bio" class="space-y-8 animate-fadeIn">
				<div>
					<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs font-mono mb-4">
						<span>🥋 Hermitage of Code & Craft</span>
					</div>
					<div class="flex flex-wrap items-baseline gap-3">
						<h2 class="text-3xl sm:text-4xl font-fraunces font-bold text-stone-900 dark:text-stone-50 tracking-tight">
							{profile.name}
						</h2>
						<span class="font-caveat text-xl text-amber-600 dark:text-amber-400">
							(Aria Nur Jamal)
						</span>
					</div>
					<div class="text-xs font-mono font-bold text-stone-500 dark:text-stone-400 mt-1">
						{profile.title}
					</div>
					<p class="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-inter mt-3 max-w-2xl leading-relaxed">
						{profile.bio}
					</p>
				</div>

				<!-- Experience Highlights -->
				<div class="space-y-3 pt-2">
					<div class="font-mono text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider flex items-center gap-2">
						<span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
						<span>Riwayat & Pengalaman Profesional</span>
					</div>
					<div class="grid sm:grid-cols-3 gap-3">
						{#each profile.experience as exp}
							<div class="p-3.5 rounded-xl bg-white dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700/70 text-xs flex flex-col justify-between">
								<div>
									<div class="font-mono text-[11px] text-amber-600 dark:text-amber-400 font-semibold">{exp.period}</div>
									<div class="font-bold text-stone-900 dark:text-stone-100 mt-0.5">{exp.role}</div>
									<div class="text-[11px] text-stone-500 dark:text-stone-400 font-mono">{exp.company}</div>
									<p class="text-stone-600 dark:text-stone-300 mt-2 text-[11px] leading-relaxed">
										{exp.desc}
									</p>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Philosophy List -->
				<div class="grid sm:grid-cols-3 gap-4 pt-2">
					{#each profile.philosophy as item, i}
						<div class="p-4 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/80 shadow-sm flex flex-col justify-between">
							<span class="font-caveat text-amber-600 dark:text-amber-400 text-xl font-bold mb-2">Prinsip 0{i + 1}</span>
							<p class="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-normal">
								"{item}"
							</p>
						</div>
					{/each}
				</div>

				<!-- Stats Bar -->
				<div class="pt-4 border-t border-stone-200 dark:border-stone-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
					{#each profile.stats as stat}
						<div>
							<div class="font-mono text-xs text-stone-500 dark:text-stone-400">{stat.label}</div>
							<div class="font-mono text-sm sm:text-base font-bold text-stone-800 dark:text-stone-200 mt-0.5">{stat.label === 'Pengalaman' ? experienceYears : stat.value}</div>
						</div>
					{/each}
				</div>
			</div>

		<!-- TAB 2: PROJECTS -->
		{:else if activeTab === 'projects'}
			<div id="projects" class="space-y-6 animate-fadeIn">
				<div class="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
					<div>
						<h2 class="text-2xl font-fraunces font-bold text-stone-900 dark:text-stone-50">
							Katalog Karya Terpilih
						</h2>
						<p class="text-xs font-mono text-stone-500 dark:text-stone-400 mt-1">
							Arahkan kursor untuk melihat jejak spidol marker interaktif
						</p>
					</div>
					<span class="font-caveat text-lg text-amber-600 dark:text-amber-400">
						{projects.length} Proyek Aktif
					</span>
				</div>

				<div class="space-y-5">
					{#each projects as proj}
						<div
							class="p-5 rounded-2xl bg-white dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 shadow-sm hover:border-amber-400 dark:hover:border-amber-500/80 transition-all duration-200"
							onmouseenter={() => (hoveredProject = proj.id)}
							onmouseleave={() => (hoveredProject = null)}
							role="region"
							aria-label="Proyek: {proj.title}"
						>
							<div class="flex flex-wrap items-baseline justify-between gap-2">
								<div class="inline-block relative">
									<h3 class="text-lg sm:text-xl font-fraunces font-bold text-stone-900 dark:text-stone-100">
										{proj.title}
									</h3>
									<!-- Self-drawing scribble marker underline -->
									<Scribble active={hoveredProject === proj.id} />
								</div>
								<div class="flex items-center gap-2">
									<span class="px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 font-mono text-xs">
										{proj.category}
									</span>
									<span class="font-mono text-xs text-stone-400">{proj.year}</span>
								</div>
							</div>

							<p class="text-sm text-stone-600 dark:text-stone-300 mt-2.5 leading-relaxed">
								{proj.description}
							</p>

							<div class="mt-4 pt-3 border-t border-stone-100 dark:border-stone-700/50 flex flex-wrap items-center justify-between gap-3">
								<div class="flex flex-wrap gap-1.5">
									{#each proj.tech as t}
										<span class="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono text-[11px]">
											{t}
										</span>
									{/each}
								</div>

								<div class="flex items-center gap-3">
									{#if proj.demo}
										<a
											href={proj.demo}
											target="_blank"
											rel="noreferrer"
											class="inline-flex items-center gap-1 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 underline underline-offset-2"
										>
											<span>{proj.demoLabel ?? 'Live Demo'}</span>
											<span>↗</span>
										</a>
									{/if}
									{#if proj.github}
										<a
											href={proj.github}
											target="_blank"
											rel="noreferrer"
											class="inline-flex items-center gap-1 text-xs font-mono font-bold text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 underline underline-offset-2"
										>
											<span>Buka Kode</span>
											<span>↗</span>
										</a>
									{/if}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

		<!-- TAB 3: TULISAN / BLOG -->
		{:else if activeTab === 'blog'}
			<div id="blog" class="space-y-6 animate-fadeIn">
				{#if selectedPost}
					<!-- Single Post Reading View -->
					<div class="space-y-6">
						<a
							href="/#blog"
							class="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors cursor-pointer group"
							onclick={(e) => {
								sound.playPaperTurn();
								if (typeof window !== 'undefined' && window.location.pathname.startsWith('/blog/')) {
									e.preventDefault();
									goto('/#blog');
								} else {
									selectedPost = null;
								}
							}}
						>
							<span class="group-hover:-translate-x-1 transition-transform">←</span>
							<span>Kembali ke Semua Coretan</span>
						</a>

						<div class="border-b border-stone-200 dark:border-stone-800 pb-5">
							<div class="flex flex-wrap items-center gap-2 mb-2">
								<span class="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold">{selectedPost.date}</span>
								<span class="text-stone-300 dark:text-stone-700">·</span>
								<span class="font-mono text-xs text-stone-500 dark:text-stone-400">Oleh Aria Nur Jamal</span>
								<span class="text-stone-300 dark:text-stone-700">·</span>
								<span class="inline-flex items-center gap-1.5 font-mono text-xs text-stone-500 dark:text-stone-400 transition-all duration-500 ease-out {!articleReaders.isLoaded(selectedPost.slug) ? 'blur-[3px] opacity-40 select-none' : 'blur-none opacity-100'}">
									<svg class="w-3.5 h-3.5 opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
										<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
										<circle cx="12" cy="12" r="3" />
									</svg>
									<span>{articleReaders.getReaders(selectedPost.slug).toLocaleString('id-ID')} pembaca</span>
								</span>
							</div>
							<h2 class="text-2xl sm:text-3xl font-fraunces font-bold text-stone-900 dark:text-stone-50 leading-tight">
								{selectedPost.title}
							</h2>
							<div class="flex flex-wrap gap-1.5 mt-3">
								{#each selectedPost.tags as tag}
									<span class="px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-mono text-[11px]">
										#{tag}
									</span>
								{/each}
							</div>
						</div>

						<!-- Article Body Render -->
						<div class="article-markdown font-inter text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300">
							{@html renderMarkdown(selectedPost.content)}
						</div>

						<div class="pt-6 border-t border-stone-200 dark:border-stone-800 flex justify-between items-center">
							<a
								href="/#blog"
								class="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 transition-colors cursor-pointer"
								onclick={(e) => {
									sound.playPaperTurn();
									if (typeof window !== 'undefined' && window.location.pathname.startsWith('/blog/')) {
										e.preventDefault();
										goto('/#blog');
									} else {
										selectedPost = null;
									}
								}}
							>
								<span>← Kembali ke Semua Coretan</span>
							</a>
						</div>
					</div>
				{:else}
					<!-- Posts List View -->
					<div>
						<div class="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
							<div>
								<h2 class="text-2xl font-fraunces font-bold text-stone-900 dark:text-stone-50">
									Catatan & Coretan
								</h2>
								<p class="text-xs font-mono text-stone-500 dark:text-stone-400 mt-1">
									Koleksi artikel teknis, rekayasa software, dan pemikiran seputar teknologi
								</p>
							</div>
							<span class="font-caveat text-lg text-amber-600 dark:text-amber-400">
								{blogPosts.length} Coretan
							</span>
						</div>

						<!-- Tag Filter Chips -->
						<div class="flex flex-wrap gap-1.5 pt-4 pb-2">
							<button
								type="button"
								class="px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer {selectedTag === null ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'}"
								onclick={() => selectedTag = null}
							>
								Semua ({blogPosts.length})
							</button>
							{#each Array.from(new Set(blogPosts.flatMap(p => p.tags))) as t}
								{@const count = blogPosts.filter(p => p.tags.includes(t)).length}
								{#if count > 0}
									<button
										type="button"
										class="px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer {selectedTag === t ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'}"
										onclick={() => selectedTag = selectedTag === t ? null : t}
									>
										#{t} ({count})
									</button>
								{/if}
							{/each}
						</div>

						<!-- Articles Stream -->
						<div class="space-y-4 pt-3">
							{#each blogPosts.filter(p => !selectedTag || p.tags.includes(selectedTag)) as post}
								<a
									href="/blog/{post.slug}"
									class="block p-5 rounded-2xl bg-white dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 shadow-sm hover:border-amber-400 dark:hover:border-amber-500/80 transition-all duration-200 cursor-pointer group text-left"
									onclick={() => {
										articleReaders.recordView(post.slug);
										sound.playPaperTurn();
									}}
									onmouseenter={() => (hoveredBlog = post.slug)}
									onmouseleave={() => (hoveredBlog = null)}
									aria-label="Baca tulisan: {post.title}"
								>
									<div class="flex flex-wrap items-baseline justify-between gap-2">
										<div class="inline-block relative">
											<h3 class="text-base sm:text-lg font-fraunces font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
												{post.title}
											</h3>
											<Scribble active={hoveredBlog === post.slug} />
										</div>
										<div class="flex items-center gap-2 font-mono text-xs text-stone-400 dark:text-stone-500 shrink-0">
											<span class="inline-flex items-center gap-1 text-stone-500 dark:text-stone-400 transition-all duration-500 ease-out {!articleReaders.isLoaded(post.slug) ? 'blur-[3px] opacity-40 select-none' : 'blur-none opacity-100'}" title="{articleReaders.getReaders(post.slug).toLocaleString('id-ID')} pembaca">
												<svg class="w-3.5 h-3.5 opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
													<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
													<circle cx="12" cy="12" r="3" />
												</svg>
												<span>{articleReaders.getReaders(post.slug).toLocaleString('id-ID')} pembaca</span>
											</span>
											<span>·</span>
											<span>{post.date}</span>
										</div>
									</div>

									<p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">
										{post.summary}
									</p>

									<div class="mt-3 pt-2.5 border-t border-stone-100 dark:border-stone-700/50 flex flex-wrap items-center justify-between gap-2">
										<div class="flex flex-wrap gap-1.5">
											{#each post.tags.slice(0, 4) as t}
												<span class="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono text-[10px]">
													#{t}
												</span>
											{/each}
										</div>
										<span class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
											<span>Baca Artikel</span>
											<span>→</span>
										</span>
									</div>
								</a>
							{/each}
						</div>
					</div>
				{/if}
			</div>

		<!-- TAB 3: LAB EXPERIMENTS -->
		{:else if activeTab === 'lab'}
			<div id="lab" class="space-y-6 animate-fadeIn">
				<div>
					<h2 class="text-2xl font-fraunces font-bold text-stone-900 dark:text-stone-50">
						Eksperimen Antarmuka & Interaksi Taktil
					</h2>
					<p class="text-xs font-mono text-stone-500 dark:text-stone-400 mt-1">
						Laboratorium mikro-interaksi, animasi pegas, dan sintesis audio web
					</p>
				</div>

				<div class="grid sm:grid-cols-2 gap-4">
					{#each experiments as exp}
						<div class="p-5 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/80 flex flex-col justify-between">
							<div>
								<div class="flex items-center justify-between mb-2">
									<span class="font-mono text-xs px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-semibold">
										{exp.tag}
									</span>
									<span class="font-caveat text-amber-600 dark:text-amber-400 text-sm">Lab Demo</span>
								</div>
								<h3 class="font-fraunces font-bold text-base text-stone-900 dark:text-stone-100">
									{exp.title}
								</h3>
								<p class="text-xs text-stone-600 dark:text-stone-300 mt-1.5 leading-relaxed">
									{exp.description}
								</p>
							</div>

							<div class="mt-4 pt-3 border-t border-stone-100 dark:border-stone-700/60 font-mono text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
								<span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
								<span>Cara coba: {exp.interactionHint}</span>
							</div>
						</div>
					{/each}
				</div>
			</div>

		<!-- TAB 5: NGODE (GYM ALGORITMA) -->
		{:else if activeTab === 'ngode'}
			<div id="ngode" class="space-y-6 animate-fadeIn">
				{#if selectedChallenge}
					<NgodeRunner
						challenge={selectedChallenge}
						onBack={() => { selectedChallenge = null; }}
					/>
				{:else}
					<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-4">
						<div>
							<div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-mono font-bold mb-2">
								<span>🏋️ Sesi Latihan Algoritma</span>
							</div>
							<h2 class="text-2xl font-fraunces font-bold text-stone-900 dark:text-stone-50">
								Ngode Gym
							</h2>
							<p class="text-xs font-mono text-stone-500 dark:text-stone-400 mt-1">
								Tempat push-up logika koding. Selesaikan tantangan manipulasi array interaktif langsung di browser.
							</p>
						</div>
						<span class="font-caveat text-lg text-amber-600 dark:text-amber-400 self-start sm:self-auto">
							{challenges.length} Soal Tersedia
						</span>
					</div>

					<!-- Category Filter Chips -->
					<div class="flex flex-wrap gap-1.5">
						<button
							type="button"
							class="px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer {selectedCategory === null ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'}"
							onclick={() => selectedCategory = null}
						>
							Semua ({challenges.length})
						</button>
						{#each ['Array 1D', 'Array 2D', 'Array 3D'] as cat}
							{@const count = challenges.filter(c => c.category === cat).length}
							<button
								type="button"
								class="px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer {selectedCategory === cat ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'}"
								onclick={() => selectedCategory = selectedCategory === cat ? null : cat}
							>
								{cat} ({count})
							</button>
						{/each}
					</div>

					<!-- Challenge Cards List -->
					<div class="space-y-4">
						{#each challenges.filter(c => !selectedCategory || c.category === selectedCategory) as ch}
							<div
								class="p-5 rounded-2xl bg-white dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 shadow-sm hover:border-amber-400 dark:hover:border-amber-500/80 transition-all duration-200 flex flex-col justify-between"
							>
								<div>
									<div class="flex flex-wrap items-center justify-between gap-2 mb-2">
										<div class="flex items-center gap-2">
											<span class="text-xl">{ch.emoji}</span>
											<h3 class="text-base sm:text-lg font-fraunces font-bold text-stone-900 dark:text-stone-100">
												{ch.title}
											</h3>
										</div>
										<div class="flex items-center gap-1.5">
											<span class="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold
												{ch.difficulty === 'Pemula' ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300' :
												 ch.difficulty === 'Menengah' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300' :
												 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300'}"
											>
												{ch.difficulty}
											</span>
											<span class="px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 text-[11px] font-mono">
												{ch.category}
											</span>
										</div>
									</div>

									<p class="text-xs sm:text-sm text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
										{ch.story.split('\n')[0]}
									</p>
								</div>

								<div class="mt-4 pt-3 border-t border-stone-100 dark:border-stone-700/50 flex items-center justify-between">
									<span class="text-[11px] font-mono text-stone-400 dark:text-stone-500">
										💡 {ch.hints.length} petunjuk · {ch.testCases.length} test cases
									</span>
									<button
										type="button"
										class="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-xs hover:scale-102"
										onclick={() => { selectedChallenge = ch; sound.playPaperTurn(); }}
									>
										<span>Mulai Latihan</span>
										<span>→</span>
									</button>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>

		<!-- TAB 4: CONTACT & HEADQUARTERS -->
		{:else if activeTab === 'contact'}
			<div id="contact" class="space-y-6 animate-fadeIn max-w-lg">
				<div>
					<h2 class="text-2xl font-fraunces font-bold text-stone-900 dark:text-stone-50">
						Markas & Kolaborasi
					</h2>
					<p class="text-sm text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">
						Tertarik berdiskusi seputar creative web engineering, interactive UI, atau proyek open source? Pintu padepokan selalu terbuka.
					</p>
				</div>

				<div class="space-y-3 font-mono text-xs">
					{#each profile.socials as social}
						<a
							href={social.url}
							target="_blank"
							rel="noreferrer"
							class="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-amber-400 dark:hover:border-amber-500 transition-all text-stone-800 dark:text-stone-200 group min-w-0"
						>
							<div class="flex items-center gap-2 sm:gap-2.5 min-w-0 mr-2">
								<span class="font-bold shrink-0">{social.label}</span>
								<span class="text-stone-400 dark:text-stone-500 truncate text-[11px] sm:text-xs">
									({social.handle ?? social.url.replace('https://', '')})
								</span>
							</div>
							<span class="shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-amber-600 dark:text-amber-400">
								↗
							</span>
						</a>
					{/each}
				</div>

				<!-- Live Dojo Status Note -->
				<div class="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 font-caveat text-base text-amber-900 dark:text-amber-200">
					💡 Catatan: Seluruh portofolio ini dibangun dengan Svelte 5 tanpa library UI berat. Dihosting langsung pada GitHub Pages di domain <code class="font-mono text-xs font-bold px-1 py-0.5 bg-amber-200/60 dark:bg-amber-900/60 rounded">padepokanpenguin.github.io</code>.
				</div>
			</div>
		{/if}
	</article>

	<!-- Footer Book Status & Instruction -->
	<footer class="px-6 py-3 border-t-2 border-stone-200 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-900/70 flex items-center justify-between text-[11px] font-mono text-stone-500 dark:text-stone-400">
		<div class="flex items-center gap-2">
			<span class="w-2 h-2 rounded-full bg-emerald-500"></span>
			<span>Status: Open Source Dojo Active</span>
		</div>
		<div class="hidden sm:block">
			Gunakan tombol panah keyboard [← / →] untuk membalik halaman buku
		</div>
	</footer>
</section>

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.animate-fadeIn {
		animation: fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	:global(.article-markdown h1),
	:global(.article-markdown h2),
	:global(.article-markdown h3),
	:global(.article-markdown h4) {
		font-family: var(--font-fraunces), serif;
		font-weight: 700;
		color: var(--tw-prose-headings, inherit);
		margin-top: 1.75rem;
		margin-bottom: 0.6rem;
		line-height: 1.3;
	}
	:global(.article-markdown h1) {
		font-size: 1.6rem;
	}
	:global(.article-markdown h2) {
		font-size: 1.35rem;
	}
	:global(.article-markdown h3) {
		font-size: 1.15rem;
	}
	:global(.article-markdown p) {
		margin-bottom: 1.1rem;
		line-height: 1.75;
	}
	:global(.article-markdown ul),
	:global(.article-markdown ol) {
		padding-left: 1.5rem;
		margin-bottom: 1.1rem;
		list-style-type: disc;
	}
	:global(.article-markdown ol) {
		list-style-type: decimal;
	}
	:global(.article-markdown li) {
		margin-bottom: 0.35rem;
		line-height: 1.6;
	}
	:global(.article-markdown pre) {
		background-color: #161B22;
		color: #E6EDF3;
		padding: 1.1rem;
		border-radius: 0.85rem;
		overflow-x: auto;
		font-family: var(--font-mono), monospace;
		font-size: 0.85rem;
		margin: 1.35rem 0;
		border: 1px solid rgba(255, 255, 255, 0.12);
	}
	:global(.article-markdown code:not(pre code)) {
		background-color: rgba(120, 113, 108, 0.15);
		color: #D97706;
		padding: 0.15rem 0.4rem;
		border-radius: 0.35rem;
		font-family: var(--font-mono), monospace;
		font-size: 0.88em;
	}
	:global(.dark .article-markdown code:not(pre code)),
	:global([data-theme="dark"] .article-markdown code:not(pre code)) {
		color: #FBBF24;
		background-color: rgba(251, 191, 36, 0.12);
	}
	:global(.article-markdown blockquote) {
		border-left: 3px solid #F59E0B;
		padding-left: 1rem;
		font-style: italic;
		color: #78716C;
		margin: 1.25rem 0;
	}
	:global(.article-markdown a) {
		color: #D97706;
		text-decoration: underline;
		text-underline-offset: 3px;
		font-weight: 600;
	}
	:global(.article-markdown strong) {
		font-weight: 700;
		color: inherit;
	}
	:global(.article-markdown hr) {
		border: none;
		border-top: 1px solid rgba(120, 113, 108, 0.2);
		margin: 2rem 0;
	}
</style>
