<script lang="ts">
	import type { PageProps } from '../$types';
	import Icon from '$lib/components/Icon.svelte';

	let { data }: PageProps = $props();
	let availableLogTypes = data.availableLogTypes;
	const selectedDate = $state(new Date());
</script>

<div class="grid w-1/2">
	<h1 class="my-4 text-xl font-bold">Dashboard</h1>
	<p class="mb-2">Selected Day: {selectedDate.toDateString()}</p>

	<!-- Calendar and daily summary placeholders -->
	<div class="grid grid-cols-2 gap-4">
		{#each availableLogTypes as logType, index}
			<a href="/dashboard/log/add/{logType.id}">
			<div class="flex gap-2 rounded bg-{logType.color} p-4">
				<Icon name={logType.icon} />
				{logType.name}
			</div>
			</a>
		{/each}
	</div>
</div>
