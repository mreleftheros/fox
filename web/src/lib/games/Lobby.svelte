<script lang="ts">
	let { ui = $bindable() }: { ui: Game['ui'] } = $props();
</script>

<article class="grid grid-rows-12 h-full">
	<section class="row-span-1 flex justify-center items-center">
		<div class="flex items-center gap-4 flex-wrap">
			<button
				class="bg-accent text-accent-foreground px-4 py-2 border border-border rounded-xl"
				type="button"
				onclick={() => (ui = 'room')}>Ένα Στα Γρήγορα</button
			>
			<button
				class="px-4 py-2 border border-border rounded-xl"
				type="button"
				onclick={() => (ui = 'room')}>Δημιουργία</button
			>
			<button
				class="px-4 py-2 border border-border rounded-xl"
				type="button"
				onclick={() => (ui = 'room')}>Πρόσκληση</button
			>
		</div>
	</section>
	<section class="row-span-7">trapezia</section>
	<section class="row-span-4">chat</section>
</article>
