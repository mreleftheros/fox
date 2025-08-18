<script lang="ts">
	type Season = 'autumn' | 'winter' | 'spring' | 'summer';

	const { season }: { season: Season } = $props();
</script>

<div
	role="presentation"
	aria-hidden="true"
	class="fixed inset-0 w-full h-full -z-10 dark:bg-gradient-to-b dark:from-muted/90 dark:to-muted/75"
></div>
<picture class="fixed -z-20">
	{#if season === 'autumn'}
		<source
			type="image/avif"
			srcset="
        autumn-sm.avif   640w,
        autumn-md.avif   768w,
        autumn-lg.avif   1024w,
        autumn-xl.avif   1280w,
        autumn-2xl.avif   1536w,
        autumn-default.avif   2536w,
      "
		/>
		<source
			type="image/webp"
			srcset="
        autumn-sm.webp   640w,
        autumn-md.webp   768w,
        autumn-lg.webp   1024w,
        autumn-xl.webp   1280w,
        autumn-2xl.webp   1536w,
        autumn-default.webp   2536w,
      "
		/>
		<img src="autumn-default.webp" alt="" loading="eager" decoding="async" width="2536" />
	{/if}
</picture>
