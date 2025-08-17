<script lang="ts">
	import type { Snippet } from 'svelte';
	import { setContext } from 'svelte';
	import userStore from '../store/user.svelte';

	let { children }: { children: Snippet } = $props();

	$effect(() => {
		userStore.getCurrent();
	});

	setContext('user', userStore);
</script>

{@render children()}
