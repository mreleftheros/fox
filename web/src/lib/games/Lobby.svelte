<script lang="ts">
	let { ui = $bindable() }: { ui: Game['ui'] } = $props();
</script>

<article class="grid grid-cols-3 grid-rows-6 h-full">
	<div class="row-span-1 col-span-3 flex justify-center items-center">
		<div class="flex items-center gap-4 flex-wrap">
			<button
				class="btn px-2 py-4 border border-muted-800"
				type="button"
				onclick={() => (ui = 'room')}>Νέο Παιχνίδι</button
			>
			<!-- {#if game.kind === "multiplayer" || game.kind === "both"}
        <button
          class="btn bg-primary-200 px-2 py-4 border border-muted-800"
          type="button">Ένα Στα Γρήγορα</button
        >
      {/if} -->
		</div>
	</div>
</article>
