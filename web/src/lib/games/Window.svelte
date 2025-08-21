<script lang="ts">
	import type { Snippet } from 'svelte';
	import dndStore from '../../store/dnd.svelte';
	import { Games } from '../../games';

	let {
		name,
		ui = $bindable(),
		children
	}: {
		name: Game['name'];
		ui: Game['ui'];
		children: Snippet;
	} = $props();

	let windowRef: HTMLDivElement;

	const title = Games.get(name).title;
</script>

<div
	role="dialog"
	class="bg-card text-card-foreground flex flex-col h-lg w-[min(50rem,100%)] sm:absolute left-1/4 top-1/4 sm:rounded-sm sm:border sm:border-border"
	bind:this={windowRef}
	aria-label="window"
>
	<nav
		class="bg-primary basis-6 flex justify-between items-center p-1 cursor-grab rounded-t-sm"
		onpointerdown={(e) => dndStore.onPointerDown(e, windowRef)}
	>
		<div>
			{#if title}
				<h2 class="select-none">{title}</h2>
			{/if}
		</div>
		<div>
			<!--<button
				title="Ελαχιστοποίηση παραθύρου"
				type="button"
				aria-label="minimize"
				onclick={() => {}}>&minus;</button
			>-->
			<button
				class="bg-destructive text-muted rounded-md px-1.5 py-0.5"
				title="Κλείσιμο παραθύρου"
				type="button"
				aria-label="close"
				onclick={() => (ui = null)}>&times;</button
			>
		</div>
	</nav>
	<article class="rounded-b-sm flex-1">
		{@render children()}
	</article>
	{#if ui != null}
		<div
			class="absolute flex items-center flex-row-reverse top-1/4 right-full -rotate-90 origin-bottom-right gap-12"
		>
			<button
				class={`bg-muted px-4 py-2 rounded-t-sm ${ui.current === 'lobby' ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}`}
				type="button"
				onclick={() => {
					if (ui == null) return;
					ui.current = 'lobby';
				}}>Λόμπι</button
			>
			{#if ui.value === 'room'}
				<div class="relative">
					<button
						class={`bg-muted px-4 py-2 rounded-t-sm ${ui.current === 'room' ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}`}
						type="button"
						onclick={() => {
							if (ui == null) return;
							ui.current = 'room';
						}}>Δωμάτιο</button
					>
					<button
						class="absolute top-0 left-full px-1.5 bg-destructive text-muted rounded-sm"
						type="button"
						aria-label="Κλείσιμο παιχνιδιού"
						onclick={() => {
							if (ui == null) return;
							ui.current = 'lobby';
							ui.value = 'lobby';
						}}>&times;</button
					>
				</div>
			{/if}
		</div>
	{/if}
</div>
