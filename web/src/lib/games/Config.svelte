<script lang="ts">
	import { fade, slide } from 'svelte/transition';

	let {
		cfg,
		isOpen = $bindable(),
		start,
		end
	}: { cfg: GameConfig; isOpen: boolean; start(): void; end(): void } = $props();
</script>

<div
	class={`relative border border-border text-center ${cfg.status === 'idle' ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}`}
>
	{#if isOpen}
		<div class="flex flex-col gap-2 px-2 py-4 items-center h-full" transition:slide={{ axis: 'x' }}>
			<h3 class="basis-12 select-none">Ρυθμίσεις</h3>
			<form class="flex-1 flex flex-col items-center gap-2 px-2 py-4" autocomplete="off">
				<div>
					<label class="block font-medium mb-1" for="levels">Δυσκολία</label>
					<select
						class="bg-input p-1 rounded-lg"
						name="levels"
						id="levels"
						bind:value={cfg.level}
						disabled={cfg.status === 'play' || cfg.status === 'ready'}
					>
						<option value={0}>Αρχάριος</option>
						<option value={1}>Κανονικός</option>
						<option value={2}>Επαγγελματίας</option>
					</select>
				</div>
				{#if cfg.status === 'play'}
					<button
						class="bg-destructive text-muted px-4 py-2 border border-border mt-auto rounded-xl"
						type="button"
						onclick={end}>Λήξη</button
					>
				{:else}
					<button
						class="bg-primary px-4 py-2 border border-border mt-auto rounded-xl"
						type="button"
						onclick={start}>Εκκίνηση</button
					>
				{/if}
			</form>
			<button
				class="absolute left-0 top-1/2 p-2"
				type="button"
				title="κλείσιμο ρυθμίσεων"
				onclick={() => (isOpen = false)}>&#10097;</button
			>
		</div>
	{:else}
		<button
			class="absolute right-0 top-1/2 p-2"
			type="button"
			title="άνοιγμα ρυθμίσεων"
			in:fade={{ delay: 150 }}
			onclick={() => (isOpen = true)}>&#10096;</button
		>
	{/if}
</div>
