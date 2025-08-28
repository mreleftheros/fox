<script lang="ts">
	import wsStore from '../../store/ws.svelte';
	import dndStore from '../../store/dnd.svelte';

	let { chatUi = $bindable() }: { chatUi: boolean } = $props();

	$effect(() => {
		wsStore.connectChat();
	});

	let windowRef: HTMLDivElement;
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
		<h2 class="select-none">Γενική Συνομιλία</h2>
		<div>
			<button
				class="bg-destructive text-muted rounded-md px-1.5 py-0.5"
				title="Κλείσιμο παραθύρου"
				type="button"
				aria-label="close"
				onclick={() => (chatUi = false)}>&times;</button
			>
		</div>
	</nav>
	<section class="rounded-b-sm flex-1 grid grid-cols-12 grid-rows-12">
		<header class="col-start-1 col-end-10 row-start-1 row-end-2 border border-border p-1">
			kathgories
		</header>
		<article class="col-start-1 col-end-10 row-start-2 row-end-12 border border-border p-1">
			chat
		</article>
		<form class="row-start-12 row-end-13 col-start-1 col-end-10 flex p-1 border border-border">
			<input
				class="border border-input flex-1"
				type="text"
				name="message"
				placeholder="Γράψε ένα μήνυμα..."
			/>
			<button
				aria-label="Στείλε μήνυμα"
				title="Στείλε μήνυμα"
				type="button"
				class="text-3xl text-primary rounded-md px-6 py-0.5">&#10146;</button
			>
		</form>
		<aside class="col-start-10 col-end-13 row-start-1 row-end-13 border border-border p-1">
			xrhstes
		</aside>
	</section>
</div>
