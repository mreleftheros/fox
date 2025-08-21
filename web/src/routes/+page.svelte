<script lang="ts">
	import windows from '../store/windows.svelte';
	import Window from '$lib/games/Window.svelte';
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
	<section class="px-2">
		<div
			class="bg-card text-card-foreground flex flex-col gap-2 max-w-sm max-h-xl overflow-y-auto py-4 px-2 rounded-xl"
		>
			<h2>Τελευταία Παιχνίδια</h2>
			<hr />
			<ul role="list" class="flex flex-col gap-2">
				<li>
					<button
						class="bg-accent text-accent-foreground px-4 py-2 rounded-xl border border-border"
						type="button"
						onclick={() => windows.setGame('memory', 'lobby')}>Παιχνίδι Μνήμης</button
					>
				</li>
			</ul>
		</div>
		<!-- Games -->
		{#each windows.openedGames as g (g.name)}
			<div class="" in:scale={{ easing: cubicInOut }}>
				{#if g.name === 'memory'}
					<Window name={g.name} bind:ui={g.ui}>
						{#await import("$lib/games/memory/Game.svelte")}
							<p>Loading</p>
						{:then { default: MemoryGame }}
							<MemoryGame bind:ui={g.ui} />
						{/await}
					</Window>
				{/if}
			</div>
		{/each}
	</section>
</main>
