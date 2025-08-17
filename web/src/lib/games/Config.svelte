<script lang="ts">
	import { fade, slide } from 'svelte/transition';

	let {
		cfg,
		isOpen = $bindable(),
		start,
		end
	}: { cfg: GameConfig; isOpen: boolean; start(): void; end(): void } = $props();
</script>

<div class="relative bg-muted">
	{#if isOpen}
		<div class="flex flex-col gap-2 px-2 py-4 items-center h-full" transition:slide={{ axis: 'x' }}>
			<h3 class="text-center select-none">Ρυθμίσεις</h3>
			<hr class="border border-muted-800 rounded-xl w-3/4 mt-2 mb-6" />
			<form
				class="flex-1 flex flex-col items-center gap-2 border border-muted-800 py-4 px-2 rounded-lg"
				autocomplete="off"
			>
				<div class="flex flex-col items-center gap-1" role="group">
					<label class="form-label" for="levels">Δυσκολία</label>
					<select
						class="form-select bg-muted-100"
						name="levels"
						id="levels"
						bind:value={cfg.level}
						disabled={cfg.status === 'play'}
					>
						<option value={0}>Αρχάριος</option>
						<option value={1}>Κανονικός</option>
						<option value={2}>Επαγγελματίας</option>
					</select>
				</div>
				{#if cfg.status === 'play'}
					<button
						class="bg-error text-muted-20 px-2 py-4 border border-muted-950 mt-auto w-32"
						type="button"
						onclick={end}>Λήξη</button
					>
				{:else}
					<button
						class="bg-secondary text-muted-5 px-2 py-4 border border-muted-950 mt-auto"
						type="button"
						onclick={start}>Εκκίνηση</button
					>
				{/if}
			</form>
			<button
				class="absolute btn left-0 top-1/2 p-2"
				type="button"
				title="κλείσιμο ρυθμίσεων"
				onclick={() => (isOpen = false)}>&#10097;</button
			>
		</div>
	{:else}
		<button
			class="absolute btn right-0 top-1/2 p-2"
			type="button"
			title="άνοιγμα ρυθμίσεων"
			in:fade={{ delay: 150 }}
			onclick={() => (isOpen = true)}>&#10096;</button
		>
	{/if}
</div>
