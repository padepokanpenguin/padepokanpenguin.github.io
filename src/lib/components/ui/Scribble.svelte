<script lang="ts">
	import { draw } from 'svelte/transition';

	interface Props {
		active?: boolean;
		color?: string;
		height?: number;
		duration?: number;
	}

	let {
		active = false,
		color = '#F97316',
		height = 8,
		duration = 320
	}: Props = $props();
</script>

<div class="relative w-full overflow-visible pointer-events-none" style="height: {height}px;">
	{#if active}
		<svg
			viewBox="0 0 200 12"
			preserveAspectRatio="none"
			class="absolute inset-0 w-full h-full overflow-visible"
		>
			<!-- Natural wobbly marker stroke -->
			<path
				d="M 2,8 Q 50,2 100,7 T 198,5"
				stroke={color}
				stroke-width="3.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				fill="none"
				in:draw={{ duration }}
			/>
		</svg>
	{/if}
</div>
