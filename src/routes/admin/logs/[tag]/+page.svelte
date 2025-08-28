<script lang="ts">
	import { Plus } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import Icon from '$lib/components/Icon.svelte';


	let { data }: PageProps = $props();
	let entries = $derived(data.entries);
</script>

<div class="grid">
	<div>
		<h1 class="my-4</div> text-xl font-bold">Log Types</h1>
	</div>

	<div class="h-140 flex-grow overflow-y-auto rounded border">
		<ul class="mt-4">
			{#if Array.isArray(entries) && entries.length > 0}
				{#each entries as item, index}
					<li class="bg-{item.log_types.color} flex gap-x-1 p-2">
						<a href="/log/edit/{item.log_entries.id}" class="flex gap-2 p-2">
							<Icon name={item.log_types.icon} />
							{item.log_entries.timestamp.toTimeString().slice(0, 5)} &mdash; {item.log_types.name}
							{#if item.log_types.name.includes('Toilet')}
								<div class="rounded border pr-2 pl-2">score: {item.log_entries.score}</div>
							{/if}
							{#if item.log_entries.note != '-' && item.log_entries.note != ''}
								<div class="rounded border pr-2 pl-2">{item.log_entries.note}</div>
							{/if}
							{#if item.log_entries.description != '-' && item.log_entries.description != ''}
								<div class="rounded border pr-2 pl-2">{item.log_entries.description}</div>
							{/if}
						</a>
					</li>
				{/each}
			{:else}
				<li>No data....</li>
			{/if}
		</ul>
	</div>
</div>
