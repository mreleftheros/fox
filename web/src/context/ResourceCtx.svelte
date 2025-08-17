<script lang="ts">
	import { getContext, setContext, type Snippet } from 'svelte';
	import resourceStore from '../store/resources.svelte';

	let { children }: { children: Snippet } = $props();

	const userCtx = getContext<UserContext>('user');

	setContext('resources', resourceStore);

	$effect(() => {
		if (userCtx.value) {
			resourceStore.getAll();
		} else {
			resourceStore.reset();
		}
	});
</script>

{@render children()}
