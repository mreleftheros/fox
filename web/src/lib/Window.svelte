<script lang="ts">
	import type { Snippet } from 'svelte';
	import dndStore from '../store/dnd.svelte';

	let {
		children,
		title,
		onClose
	}: {
		children: Snippet;
		title: string;
		onClose(): void;
	} = $props();

	let windowRef: HTMLDivElement;
</script>

<div
	role="dialog"
	class="w-[min(50rem,100%)] sm:absolute left-1/4 top-1/4 rounded-xl bg-muted text-muted-foreground border border-border overflow-hidden"
	bind:this={windowRef}
	aria-label="window"
>
	<nav
		class="bg-primary min-h-8 flex justify-between items-center px-2 cursor-grab"
		onpointerdown={(e) => dndStore.onPointerDown(e, windowRef)}
	>
		<div>
			{#if title}
				<h2 class="select-none">{title}</h2>
			{/if}
		</div>
		<div>
			<button
				title="Ελαχιστοποίηση παραθύρου"
				type="button"
				aria-label="minimize"
				onclick={() => {}}>&minus;</button
			>
			<button
				class="bg-error text-muted px-4 py-2"
				title="Κλείσιμο παραθύρου"
				type="button"
				aria-label="close"
				onclick={onClose}>&times;</button
			>
		</div>
	</nav>
	<div class="main">
		{@render children()}
	</div>
</div>

<style>
	.box-sm {
		width: min(640px, 100%);
	}

	.box-md {
		width: min(768px, 100%);
	}

	.box-lg {
		width: min(1024px, 100%);
	}

	.main {
		height: 55rem;
	}
</style>
