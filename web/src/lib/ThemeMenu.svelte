<script lang="ts">
	import { clickOutClose } from '../action.svelte';
	import { slide } from 'svelte/transition';

	type Theme = 'light' | 'dark' | 'system';

	let theme = $state<Theme>('theme' in localStorage ? localStorage.theme : 'system');
	let isOpen = $state(false);

	// svelte-ignore non_reactive_update
	let themeToggleRef: HTMLButtonElement;

	$effect(() => {
		switch (theme) {
			case 'system':
				if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
					document.documentElement.classList.add('dark');
				} else {
					document.documentElement.classList.remove('dark');
				}
				break;
			case 'dark':
				document.documentElement.classList.add('dark');
				break;
			default:
				document.documentElement.classList.remove('dark');
				break;
		}
	});
	$effect(() => {
		if (theme === 'system') {
			localStorage.removeItem('theme');
		} else {
			localStorage.theme = theme;
		}
	});

	const updateTheme = (themeValue: Theme) => {
		theme = themeValue;
		isOpen = false;
	};
</script>

<div class="relative">
	<button
		class="bg-muted text-muted-foreground rounded-full py-0.5 px-1.5 border border-border"
		title="Φως / Σκοτάδι"
		type="button"
		aria-label="theme"
		bind:this={themeToggleRef}
		onclick={() => (isOpen = !isOpen)}
	>
		{#if theme === 'light'}
			<span class="relative" aria-hidden="true" role="img">&#127774;</span>
		{:else if theme === 'dark'}
			<span class="relative" aria-hidden="true" role="img">&#127771;</span>
		{:else}
			<span class="relative" aria-hidden="true" role="img">&#128187;</span>
		{/if}
	</button>
	{#if isOpen}
		<ul
			role="menu"
			class="bg-popover text-popover-foreground absolute rounded-xl top-full right-1/2 z-40 border border-border"
			use:clickOutClose={{
				cb: () => (isOpen = false),
				toggle: themeToggleRef
			}}
			in:slide={{ duration: 150 }}
		>
			<li>
				<button
					type="button"
					class="flex items-center justify-start gap-1 w-full border-none p-2"
					onclick={() => updateTheme('light')}
				>
					<span class="relative" aria-hidden="true" role="img">&#127774;</span>
					<span>Light</span>
				</button>
			</li>
			<li>
				<button
					type="button"
					class="flex items-center justify-start gap-1 w-full border-none p-2"
					onclick={() => updateTheme('dark')}
				>
					<span class="relative" aria-hidden="true" role="img">&#127771;</span>
					<span>Dark</span>
				</button>
			</li>
			<li>
				<button
					type="button"
					class="flex items-center justify-start gap-1 w-full border-none p-2"
					onclick={() => updateTheme('system')}
				>
					<span class="relative" aria-hidden="true" role="img">&#128187;</span>
					<span>System</span>
				</button>
			</li>
		</ul>
	{/if}
</div>
