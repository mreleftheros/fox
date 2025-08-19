<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { bounceOut } from 'svelte/easing';
	import toastStore from '../store/toasts.svelte';

	let { id, kind, message }: Toast = $props();

	$effect(() => {
		let timeout = setTimeout(() => {
			toastStore.remove(id);
		}, 5000);

		return () => {
			clearTimeout(timeout);
		};
	});
</script>

<div
	role="alert"
	class="bg-accent text-accent-foreground w-[min(40rem,100%)] px-4 py-2 rounded-xl border border-border"
	in:fly={{ x: 50, easing: bounceOut }}
	out:fade
>
	a toast
</div>
