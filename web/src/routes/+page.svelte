<script lang="ts">
	import appStore from '../store/app.svelte';
	import Window from '$lib/Window.svelte';
	import foxIcon from '$lib/assets/fox.svg';
	import NotificationMenu from '$lib/NotificationMenu.svelte';
	import ThemeMenu from '$lib/ThemeMenu.svelte';
	import { cubicInOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
</script>

<header>
	<nav
		class="flex flex-col md:flex-row min-h-20 px-2 py-4 md:py-0 md:justify-between items-center gap-4"
	>
		<img width="50" aria-hidden="true" src={foxIcon} alt="" />
		<div class="flex flex-col items-center gap-2 md:flex-row">
			<NotificationMenu />
			<ThemeMenu />
		</div>
	</nav>
</header>
<main>
	<section class="min-h-screen px-2">
		<div class="flex flex-col gap-2 w-96 bg-muted min-h-96 py-4 px-2 rounded-xl">
			<h2>Τελευταία Παιχνίδια</h2>
			<hr />
			<ul role="list" class="flex flex-col gap-2">
				<li>
					<button class="p-2" type="button" onclick={() => appStore.setGame('memory', 'lobby')}
						>Παιχνίδι Μνήμης</button
					>
				</li>
			</ul>
		</div>
		<!-- Games -->
		{#each appStore.activeGames as ag, i (ag.name)}
			<div in:scale={{ easing: cubicInOut }}>
				{#if ag.name === 'memory'}
					<Window title="Παιχνίδι Μνήμης" onClose={() => (ag.ui = null)}>
						{#await import("$lib/games/memory/Game.svelte")}
							<p>Loading</p>
						{:then { default: MemoryGame }}
							<MemoryGame
								name={appStore.activeGames[i].name}
								bind:ui={appStore.activeGames[i].ui}
							/>
						{/await}
					</Window>
				{/if}
			</div>
		{/each}
	</section>
</main>
