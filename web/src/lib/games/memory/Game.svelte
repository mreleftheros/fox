<script lang="ts">
	import store from './store.svelte';
	import Lobby from '$lib/games/Lobby.svelte';
	import Config from '../Config.svelte';

	let { ui = $bindable() }: Pick<Game, 'ui'> = $props();

	$effect(() => {
		if (store.isMatch) {
			console.log('MATCH!!!', store.value.flippedCards[0]);
		}
	});

	$effect(() => {
		if (store.value.flippedCards.length === 2) {
			store.value.isPause = true;

			store.timeOut = setTimeout(() => {
				store.value.flippedCards.length = 0;
				store.value.isPause = false;
			}, 1000);
		}
		return () => clearTimeout(store.timeOut);
	});
</script>

<div class="relative w-full h-full bg-card text-card-foreground">
	{#if ui?.current === 'lobby'}
		<Lobby bind:ui />
	{:else if ui?.current === 'room'}
		<article class="relative flex h-full">
			<div class={`flex-1 flex flex-col`}>
				<div class="basis-24 flex items-center gap-2">
					<div></div>
					<div>
						<progress value="40" max="100"></progress>
						<output>{store.level.duration / 1000} seconds left</output>
					</div>
				</div>
				<div
					class={`flex-1 p-2 grid ${store.gridColsClass} grid-rows-4 gap-8 justify-items-center `}
				>
					{#if store.value.allCards.length > 0 && store.config.status === 'play'}
						{#each store.value.allCards as c (c.id)}
							<button
								class="relative rounded-lg w-18 bg-gradient-to-tr from-secondary to-primary card"
								type="button"
								aria-label="Κάρτα παιχνιδιού"
								onclick={() => (store.value.isPause ? undefined : store.value.flippedCards.push(c))}
							>
								<div
									class="inner"
									class:flipped={!!store.value.flippedCards.find((f) => f.id === c.id)}
								>
									<div
										class="front bg-gradient-to-tr from-primary-500 to-secondary rounded-lg"
									></div>
									<div class="back bg-primary-50 rounded-lg">
										<span
											class="text-4xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
											>{@html c.value}</span
										>
									</div>
								</div>
							</button>
						{/each}
					{:else}
						{#each Array(store.level.pairs * 2) as _}
							<button
								class="relative rounded-lg w-18 bg-gradient-to-tr from-primary to-secondary card"
								aria-label="Κάρτα παιχνιδιού"
								disabled
								type="button"
							>
								<div class="inner">
									<div class="front"></div>
									<div class="back"></div>
								</div>
							</button>
						{/each}
					{/if}
				</div>
			</div>
			<Config
				cfg={store.config}
				bind:isOpen={store.value.isConfigOpen}
				start={store.start}
				end={store.end}
			/>
		</article>
	{/if}
</div>

<style lang="postcss">
	.card {
		perspective: 1000px;

		.inner {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			transition: transform 300ms ease;
			transform-style: preserve-3d;

			&.flipped {
				transform: rotateY(-180deg);
			}
		}

		.front {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			backface-visibility: hidden;
		}

		.back {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			backface-visibility: hidden;
			transform: rotateY(180deg);
		}
	}
</style>
