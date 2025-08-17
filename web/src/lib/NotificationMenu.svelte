<script lang="ts">
	import { clickOutClose } from '../action.svelte';
	import { slide } from 'svelte/transition';

	let isOpen = $state(false);

	let notificationToggleRef: HTMLButtonElement;
</script>

<div class="relative">
	<!-- Toggle -->
	<button
		class="bg-muted rounded-full px-1.5 py-0.5 border border-border"
		title="Ειδοποιήσεις Χρήστη"
		aria-label="notifications"
		type="button"
		bind:this={notificationToggleRef}
		onclick={() => (isOpen = !isOpen)}
	>
		<span role="img" aria-hidden="true">&#128276;</span>
	</button>
	<!-- Menu -->
	{#if isOpen}
		<div
			class="absolute flex flex-col gap-6 top-full right-1/2 z-40 bg-muted rounded-xl h-96 w-max px-2 py-4"
			role="menu"
			aria-label="Ειδοποιήσεις Χρήστη"
			use:clickOutClose={{
				cb: () => (isOpen = false),
				toggle: notificationToggleRef
			}}
			in:slide={{ duration: 150 }}
		>
			<ul role="list" class="flex flex-col gap-4 h-full overflow-y-auto">
				<li class="bg-muted px-4 py-2 rounded-xl">
					<p>Ο χρήστης test σας έστειλε αίτημα φιλίας.</p>
				</li>
				<li class="bg-muted px-4 py-2 rounded-xl">
					<p>Ο χρήστης test σας έστειλε αίτημα φιλίας.</p>
				</li>
				<li class="bg-muted px-4 py-2 rounded-xl">
					<p>Ο χρήστης test σας έστειλε αίτημα φιλίας.</p>
				</li>
			</ul>
			<div class="mt-auto flex items-center w-full gap-2">
				<button class="flex-1 px-4 py-2 rounded-xl border border-border" type="button"
					>Δείτε όλες</button
				>
				<button class="flex-1 px-4 py-2 rounded-xl border border-border" type="button"
					>Εκκαθάριση</button
				>
			</div>
		</div>
	{/if}
</div>
