<script lang="ts">
	import {
		type Challenge,
		type SupportedLanguage,
		SUPPORTED_LANGUAGES
	} from '#lib/data/challenges';
	import { sound } from '#lib/sound/audio';

	interface Props {
		challenge: Challenge;
		onBack: () => void;
	}

	let { challenge, onBack }: Props = $props();

	let selectedLanguage = $state<SupportedLanguage>('javascript');
	let code = $state(challenge.starterCodes?.javascript ?? challenge.starterCode);
	let results = $state<{ passed: boolean; label: string; got: string; expected: string }[]>([]);
	let running = $state(false);
	let runtimeStatus = $state('');
	let allPassed = $state(false);
	let showHint = $state(-1);
	let errorMsg = $state('');

	// Cache for loaded Pyodide instance
	let pyodideInstance: any = null;

	$effect(() => {
		// When challenge changes, reset code to current language's starter code
		const starter = challenge.starterCodes?.[selectedLanguage] ?? challenge.starterCode;
		code = starter;
		results = [];
		allPassed = false;
		showHint = -1;
		errorMsg = '';
		runtimeStatus = '';
	});

	function setLanguage(lang: SupportedLanguage) {
		if (selectedLanguage === lang) return;
		selectedLanguage = lang;
		code = challenge.starterCodes?.[lang] ?? challenge.starterCode;
		results = [];
		allPassed = false;
		errorMsg = '';
		runtimeStatus = '';
		sound.playPaperTurn();
	}

	function stripTypeScript(tsCode: string): string {
		let js = tsCode;
		// Strip interfaces
		js = js.replace(/interface\s+\w+(?:<[^>]+>)?\s*\{[^}]*\}/g, '');
		// Strip type aliases
		js = js.replace(/type\s+\w+(?:<[^>]+>)?\s*=\s*[^;]+;/g, '');
		// Strip param and variable type annotations
		js = js.replace(/:\s*([A-Za-z0-9_<>\[\]|&\s]+)(?=[,\)\=\{])/g, '');
		// Strip 'as Type' casts
		js = js.replace(/\s+as\s+[A-Za-z0-9_<>\[\]]+/g, '');
		return js;
	}

	async function getPyodide(): Promise<any> {
		if (pyodideInstance) return pyodideInstance;

		if (typeof window === 'undefined') {
			throw new Error('Python runtime hanya dapat dijalankan di browser');
		}

		runtimeStatus = 'Mengunduh Python WebAssembly runtime (~6MB)...';

		if (!(window as any).loadPyodide) {
			await new Promise<void>((resolve, reject) => {
				const script = document.createElement('script');
				script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
				script.onload = () => resolve();
				script.onerror = () => reject(new Error('Gagal memuat Pyodide dari CDN'));
				document.head.appendChild(script);
			});
		}

		runtimeStatus = 'Menginisialisasi Python runtime...';
		const pyodide = await (window as any).loadPyodide({
			indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/'
		});

		pyodideInstance = pyodide;
		runtimeStatus = '';
		return pyodide;
	}

	async function runCode() {
		running = true;
		errorMsg = '';
		results = [];
		allPassed = false;

		try {
			if (selectedLanguage === 'python') {
				const fnName = code.match(/def\s+([a-zA-Z_][a-zA-Z0-9_]*)/)?.[1];
				if (!fnName) {
					errorMsg = 'Tidak ditemukan fungsi Python. Pastikan kode memiliki "def nama_fungsi(...):"';
					running = false;
					return;
				}

				const pyodide = await getPyodide();
				runtimeStatus = 'Menjalankan test cases Python...';
				const newResults: typeof results = [];

				for (const tc of challenge.testCases) {
					try {
						// Convert input args to python call
						const pySnippet = `
import json
${code}
_res = ${fnName}(${tc.input})
json.dumps(_res, separators=(',', ':'))
`;
						const got = await pyodide.runPythonAsync(pySnippet);
						newResults.push({
							passed: got === tc.expected,
							label: tc.label,
							got: String(got),
							expected: tc.expected
						});
					} catch (e) {
						newResults.push({
							passed: false,
							label: tc.label,
							got: `Error: ${e instanceof Error ? e.message : String(e)}`,
							expected: tc.expected
						});
					}
				}

				results = newResults;
				allPassed = newResults.every((r) => r.passed);
				if (allPassed) sound.playPaperTurn();
				runtimeStatus = '';
			} else {
				// JavaScript or TypeScript
				const fnName = code.match(/function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/)?.[1];
				if (!fnName) {
					errorMsg = 'Tidak ditemukan deklarasi function. Pastikan kode memiliki "function namaFungsi(...)"';
					running = false;
					return;
				}

				const executableCode = selectedLanguage === 'typescript' ? stripTypeScript(code) : code;
				const newResults: typeof results = [];

				for (const tc of challenge.testCases) {
					try {
						const callArgs = tc.input;
						const execCode = `${executableCode}\nreturn JSON.stringify(${fnName}(${callArgs}));`;
						const fn = new Function(execCode);
						const got = fn() as string;

						newResults.push({
							passed: got === tc.expected,
							label: tc.label,
							got,
							expected: tc.expected
						});
					} catch (e) {
						newResults.push({
							passed: false,
							label: tc.label,
							got: `Error: ${e instanceof Error ? e.message : String(e)}`,
							expected: tc.expected
						});
					}
				}

				results = newResults;
				allPassed = newResults.every((r) => r.passed);
				if (allPassed) sound.playPaperTurn();
			}
		} catch (e) {
			errorMsg = `Runtime Error: ${e instanceof Error ? e.message : String(e)}`;
		} finally {
			running = false;
			runtimeStatus = '';
		}
	}

	function resetCode() {
		code = challenge.starterCodes?.[selectedLanguage] ?? challenge.starterCode;
		results = [];
		allPassed = false;
		errorMsg = '';
		runtimeStatus = '';
		showHint = -1;
	}

	function toggleHint(i: number) {
		showHint = showHint === i ? -1 : i;
	}

	function handleTab(e: KeyboardEvent) {
		if (e.key === 'Tab') {
			e.preventDefault();
			const el = e.target as HTMLTextAreaElement;
			const start = el.selectionStart;
			const end = el.selectionEnd;
			code = code.substring(0, start) + '  ' + code.substring(end);
			requestAnimationFrame(() => {
				el.selectionStart = el.selectionEnd = start + 2;
			});
		}
	}

	const currentLangInfo = $derived(
		SUPPORTED_LANGUAGES.find((l) => l.id === selectedLanguage) ?? SUPPORTED_LANGUAGES[0]
	);
</script>

<div class="space-y-5 animate-fadeIn">
	<!-- Back + title + status -->
	<div class="flex items-start justify-between gap-3">
		<div>
			<button
				type="button"
				class="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors cursor-pointer group mb-2"
				onclick={() => {
					onBack();
					sound.playPaperTurn();
				}}
			>
				<span class="group-hover:-translate-x-1 transition-transform">←</span>
				<span>Kembali ke Daftar Soal</span>
			</button>
			<h3 class="text-xl sm:text-2xl font-fraunces font-bold text-stone-900 dark:text-stone-50">
				{challenge.emoji} {challenge.title}
			</h3>
			<div class="flex items-center gap-2 mt-1.5">
				<span
					class="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold
					{challenge.difficulty === 'Pemula'
						? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
						: challenge.difficulty === 'Menengah'
							? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
							: 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300'}"
				>
					{challenge.difficulty}
				</span>
				<span
					class="px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[11px] font-mono"
				>
					{challenge.category}
				</span>
			</div>
		</div>
		{#if allPassed}
			<div
				class="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-mono font-bold flex items-center gap-1.5 shrink-0"
			>
				<span>✅</span> Lulus!
			</div>
		{/if}
	</div>

	<!-- Story -->
	<div
		class="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/50 text-sm text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line font-inter"
	>
		{challenge.story}
	</div>

	<!-- Task -->
	<div class="p-4 rounded-xl bg-white dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700/70">
		<div
			class="font-mono text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-1.5"
		>
			<span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
			Tugas
		</div>
		<div
			class="text-sm text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line font-inter challenge-task"
		>
			{@html challenge.task
				.replace(
					/`([^`]+)`/g,
					'<code class="px-1 py-0.5 rounded bg-stone-100 dark:bg-stone-900 font-mono text-xs text-amber-700 dark:text-amber-300">$1</code>'
				)
				.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold">$1</strong>')}
		</div>
	</div>

	<!-- Code editor wrapper -->
	<div class="rounded-2xl overflow-hidden border border-stone-300 dark:border-stone-700 shadow-sm">
		<!-- Top Bar: Language Selector + File Name + Actions -->
		<div
			class="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-stone-200/90 dark:bg-stone-800/95 border-b border-stone-300 dark:border-stone-700"
		>
			<!-- Language Tabs Switcher -->
			<div class="flex items-center gap-1 bg-stone-300/60 dark:bg-stone-900/60 p-0.5 rounded-xl">
				{#each SUPPORTED_LANGUAGES as lang}
					<button
						type="button"
						class="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 {selectedLanguage ===
						lang.id
							? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
							: 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'}"
						onclick={() => setLanguage(lang.id)}
					>
						<span>{lang.icon}</span>
						<span>{lang.name}</span>
						<span class="text-[10px] opacity-60 hidden sm:inline">{lang.badge}</span>
					</button>
				{/each}
			</div>

			<!-- Right side: File tag, Reset, Run -->
			<div class="flex items-center gap-2">
				<span
					class="font-mono text-[11px] text-stone-500 dark:text-stone-400 hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-900 border border-stone-300/60 dark:border-stone-700/60"
				>
					<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
					editor{currentLangInfo.ext}
				</span>

				<button
					type="button"
					class="px-2.5 py-1 rounded-lg text-[11px] font-mono text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-300/60 dark:hover:bg-stone-700/60 transition-colors cursor-pointer"
					onclick={resetCode}
					title="Kembalikan kode ke template awal"
				>
					↺ Reset
				</button>
				<button
					type="button"
					class="px-3.5 py-1 rounded-lg text-xs font-mono font-bold bg-amber-500 hover:bg-amber-600 text-stone-950 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs disabled:opacity-60"
					onclick={runCode}
					disabled={running}
				>
					<span>{running ? '⏳' : '▶'}</span>
					<span>{running ? 'Memproses...' : 'Jalankan'}</span>
				</button>
			</div>
		</div>

		<!-- Runtime Status Banner (e.g. Loading Pyodide) -->
		{#if runtimeStatus}
			<div
				class="px-3 py-1.5 bg-amber-100/90 dark:bg-amber-950/70 border-b border-amber-300 dark:border-amber-800/60 text-xs font-mono text-amber-900 dark:text-amber-200 flex items-center gap-2 animate-pulse"
			>
				<span class="w-2 h-2 rounded-full bg-amber-500"></span>
				<span>{runtimeStatus}</span>
			</div>
		{/if}

		<!-- Editor Textarea -->
		<textarea
			bind:value={code}
			onkeydown={handleTab}
			class="w-full bg-stone-50 dark:bg-[#0d1117] text-stone-800 dark:text-stone-200 font-mono text-sm p-4 resize-y outline-none min-h-[240px] leading-relaxed block"
			spellcheck="false"
			autocomplete="off"
			autocorrect="off"
			autocapitalize="off"
		></textarea>
	</div>

	<!-- Error Message -->
	{#if errorMsg}
		<div
			class="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-sm font-mono text-red-700 dark:text-red-300"
		>
			<div class="font-bold mb-1 flex items-center gap-1.5">
				<span>⚠️</span> Pesan Kesalahan
			</div>
			<div class="whitespace-pre-wrap">{errorMsg}</div>
		</div>
	{/if}

	<!-- Test Results -->
	{#if results.length > 0}
		<div class="space-y-2.5">
			<div
				class="font-mono text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider flex items-center gap-1.5"
			>
				<span class="w-1.5 h-1.5 rounded-full {allPassed ? 'bg-emerald-500' : 'bg-red-500'}"></span>
				Hasil Test ({results.filter((r) => r.passed).length}/{results.length} lulus)
			</div>
			{#each results as r, i}
				<div
					class="p-3 rounded-xl border text-xs font-mono
					{r.passed
						? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60'
						: 'bg-red-50/80 dark:bg-red-950/30 border-red-200 dark:border-red-800/60'}"
				>
					<div
						class="flex items-center gap-2 font-bold {r.passed
							? 'text-emerald-700 dark:text-emerald-300'
							: 'text-red-700 dark:text-red-300'}"
					>
						<span>{r.passed ? '✓' : '✗'}</span>
						<span>Test {i + 1}: {r.label}</span>
					</div>
					{#if !r.passed}
						<div class="mt-2 space-y-1 text-stone-600 dark:text-stone-400 pl-4 border-l-2 border-red-300 dark:border-red-800">
							<div>Expected: <span class="text-emerald-700 dark:text-emerald-300 font-bold">{r.expected}</span></div>
							<div>Got: <span class="text-red-700 dark:text-red-300 font-bold">{r.got}</span></div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}

	<!-- Hints -->
	<div class="space-y-2">
		<div
			class="font-mono text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider flex items-center gap-1.5"
		>
			<span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
			Petunjuk ({challenge.hints.length} tersedia)
		</div>
		{#each challenge.hints as hint, i}
			<button
				type="button"
				class="w-full text-left p-3 rounded-xl border transition-all cursor-pointer
					{showHint === i
						? 'bg-blue-50/80 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/60'
						: 'bg-white dark:bg-stone-800/50 border-stone-200 dark:border-stone-700/70 hover:border-blue-300 dark:hover:border-blue-700'}"
				onclick={() => toggleHint(i)}
			>
				<div class="flex items-center justify-between">
					<span class="text-xs font-mono font-bold text-stone-600 dark:text-stone-300">
						💡 Petunjuk {i + 1}
					</span>
					<span class="text-xs text-stone-400 transition-transform {showHint === i ? 'rotate-90' : ''}">▶</span>
				</div>
				{#if showHint === i}
					<p class="mt-2 text-xs text-stone-600 dark:text-stone-300 font-inter leading-relaxed">
						{hint}
					</p>
				{/if}
			</button>
		{/each}
	</div>
</div>
