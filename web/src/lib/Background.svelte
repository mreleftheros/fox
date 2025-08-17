<script lang="ts">
	type Season = 'autumn' | 'winter' | 'spring' | 'summer';

	const { season }: { season: Season } = $props();
</script>

{#if season === 'winter'}
	<div aria-hidden="true" class="fixed inset-0 w-full h-full -z-10">
		<div aria-hidden="true" class="absolute bottom-[-6.5%] right-0">
			<span class="tree shine relative -z-20 text-[20rem]" role="img" aria-hidden="true"
				>&#127876;</span
			>
			<div class="absolute bottom-[20%] left-1/2 -translate-x-1/2 -z-10 flex items-center gap-2">
				{#each Array(2).fill(null) as _, i (i)}
					<span class="text-5xl" role="img" aria-hidden="true">&#127873;</span>
				{/each}
			</div>
			<div class="absolute bottom-[20%] left-1/2 -translate-x-1/2 -z-0 flex items-center gap-8">
				{#each Array(3).fill(null) as _, i (i)}
					<span class="text-2xl" role="img" aria-hidden="true">&#127873;</span>
				{/each}
			</div>
		</div>
		{#each Array(5).fill(null) as _, i (i)}
			<span
				class={`snowflake absolute text-primary-600 -z-30 snowflake-${i + 1}`}
				aria-hidden="true"
				role="img">&#10052;</span
			>
		{/each}
		<!-- <span
      class="snowman absolute bottom-[-8%] -translate-x-1/2 text-[20rem] left-1/2"
      aria-hidden="true"
      role="img">&#9924;</span
    > -->
		<!-- <span
      class="absolute top-3/4 -left-6 text-[20rem] text-primary-950"
      aria-hidden="true"
      role="img">&#127788;</span
    > -->
	</div>
{/if}

<style lang="postcss">
	.tree {
		text-shadow:
			0px 2px 10px hsl(39, 90%, 50%),
			0px -1px 5px hsl(39, 90%, 50%);
	}

	.snowman {
		text-shadow:
			1px 1px 1px hsl(var(--clr-primary-950)),
			-1px -1px 1px hsl(var(--clr-primary-950));
	}

	.snowflake {
		text-shadow: 0 0 3px hsl(var(--clr-primary-600));
	}

	.snowflake-1 {
		top: 85%;
		left: 80%;
		font-size: 2rem;
	}

	.snowflake-2 {
		top: 75%;
		left: 15%;
		font-size: 5rem;
	}

	.snowflake-3 {
		top: 40%;
		left: 45%;
		font-size: 2rem;
	}

	.snowflake-4 {
		top: 15%;
		left: 85%;
		font-size: 5rem;
	}

	.snowflake-5 {
		top: 10%;
		left: 10%;
		font-size: 2rem;
	}
</style>
