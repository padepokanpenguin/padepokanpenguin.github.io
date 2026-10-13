<script lang="ts">
	import { profile } from '#lib/data/profile';
	import { projects } from '#lib/data/projects';
	import { experiments } from '#lib/data/experiments';
	import { sound } from '#lib/sound/audio';
	import Scribble from '#lib/components/ui/Scribble.svelte';

	let activeTab = $state<'bio' | 'projects' | 'lab' | 'contact'>('bio');
	let hoveredProject = $state<string | null>(null);

	const tabs = [
		{ id: 'bio', label: '🥋 Padepokan', title: 'Tentang & Filosofi' },
		{ id: 'projects', label: '📦 Karya', title: 'Koleksi Proyek' },
		{ id: 'lab', label: '🧪 Lab Fisika', title: 'Eksperimen Interaktif' },
		{ id: 'contact', label: '📡 Markas', title: 'Kanal & Kontak' }
	] as const;

	function setTab(id: typeof activeTab) {
		if (activeTab === id) return;
		activeTab = id;
		sound.playPaperTurn();
	}

	function handleKeydown(e: KeyboardEvent) {
		const order: Array<typeof activeTab> = ['bio', 'projects', 'lab', 'contact'];
		const idx = order.indexOf(activeTab);
		if (e.key === 'ArrowRight' && idx < order.length - 1) {
			setTab(order[idx + 1]);
		} else if (e.key === 'ArrowLeft' && idx > 0) {
			setTab(order[idx - 1]);
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<section
	class="relative w-full max-w-4xl mx-auto rounded-3xl bg-stone-50 dark:bg-stone-900/90 border-2 border-stone-300 dark:border-stone-800 shadow-2xl overflow-hidden transition-colors duration-300"
>
	<!-- Top Spiral / Header Bar with Book Tabs -->
	<header class="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b-2 border-stone-200 dark:border-stone-800 bg-stone-100/70 dark:bg-stone-900/70">
		<div class="flex items-center gap-2">
			<!-- Visual Spiral Binding dots -->
			<div class="flex gap-1.5 mr-3">
				<span class="w-3 h-3 rounded-full bg-stone-300 dark:bg-stone-700 border border-stone-400 dark:border-stone-600"></span>
				<span class="w-3 h-3 rounded-full bg-stone-300 dark:bg-stone-700 border border-stone-400 dark:border-stone-600"></span>
				<span class="w-3 h-3 rounded-full bg-stone-300 dark:bg-stone-700 border border-stone-400 dark:border-stone-600"></span>
			</div>
			<span class="font-mono text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
				DeskFolio · Padepokan Book
			</span>
		</div>

		<!-- Interactive Tabs -->
		<nav class="flex items-center gap-1.5 bg-stone-200/80 dark:bg-stone-800 p-1 rounded-xl" aria-label="Tab Navigasi Buku">
			{#each tabs as tab}
				<button
					type="button"
					class="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-150 {activeTab === tab.id
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
			<div class="space-y-8 animate-fadeIn">
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
							<div class="font-mono text-sm sm:text-base font-bold text-stone-800 dark:text-stone-200 mt-0.5">{stat.value}</div>
						</div>
					{/each}
				</div>
			</div>

		<!-- TAB 2: PROJECTS -->
		{:else if activeTab === 'projects'}
			<div class="space-y-6 animate-fadeIn">
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

								{#if proj.github}
									<a
										href={proj.github}
										target="_blank"
										rel="noreferrer"
										class="inline-flex items-center gap-1 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 underline underline-offset-2"
									>
										<span>Buka Kode</span>
										<span>↗</span>
									</a>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>

		<!-- TAB 3: LAB EXPERIMENTS -->
		{:else if activeTab === 'lab'}
			<div class="space-y-6 animate-fadeIn">
				<div>
					<h2 class="text-2xl font-fraunces font-bold text-stone-900 dark:text-stone-50">
						Eksperimen Interaktif (Feral Physics)
					</h2>
					<p class="text-xs font-mono text-stone-500 dark:text-stone-400 mt-1">
						Laboratorium rekayasa fisika dan sensasi taktil antarmuka web
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

		<!-- TAB 4: CONTACT & HEADQUARTERS -->
		{:else if activeTab === 'contact'}
			<div class="space-y-6 animate-fadeIn max-w-lg">
				<div>
					<h2 class="text-2xl font-fraunces font-bold text-stone-900 dark:text-stone-50">
						Markas & Kolaborasi
					</h2>
					<p class="text-sm text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">
						Tertarik berdiskusi seputar creative web engineering, physics UI, atau proyek open source? Pintu padepokan selalu terbuka.
					</p>
				</div>

				<div class="space-y-3 font-mono text-xs">
					{#each profile.socials as social}
						<a
							href={social.url}
							target="_blank"
							rel="noreferrer"
							class="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-amber-400 dark:hover:border-amber-500 transition-all text-stone-800 dark:text-stone-200 group"
						>
							<div class="flex items-center gap-2.5">
								<span class="font-bold">{social.label}</span>
								<span class="text-stone-400">({social.url.replace('https://', '')})</span>
							</div>
							<span class="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-amber-600 dark:text-amber-400">
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
</style>
