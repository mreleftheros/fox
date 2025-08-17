<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import { flip } from 'svelte/animate';
	import { PUBLIC_APP_TITLE } from '$env/static/public';
	import foxIcon from '$lib/assets/fox.svg';
	import Background from '$lib/Background.svelte';
	import Toast from '$lib/Toast.svelte';
	import toastStore from '../store/toasts.svelte';
	import UserCtx from '../context/UserCtx.svelte';
	import ResourceCtx from '../context/ResourceCtx.svelte';

	const { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<title>{PUBLIC_APP_TITLE}</title>
	<link rel="icon" href={foxIcon} />
</svelte:head>

<Background season="winter" />
<ul role="list" class="fixed z-20 right-0 bottom-0 mb-2 mr-2 flex flex-col gap-4">
	{#each toastStore.value as t (t.id)}
		<div animate:flip>
			<Toast {...t} />
		</div>
	{/each}
</ul>
<UserCtx>
	<ResourceCtx>
		{@render children()}
	</ResourceCtx>
</UserCtx>
