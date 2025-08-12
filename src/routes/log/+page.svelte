<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import {utcToLocalTime } from '$lib/utils/date';

	let { data } = $props();

	//console.log(data.logRaw[0].log_entries.note);
	const selectedDate = $state(new Date());
</script>

<div class="grid gap-4">
	<h1 class="my-4 text-xl font-bold">Daily Log: {selectedDate.toDateString()}</h1>

	<!-- Icons to add entry -->
	<div class="grid grid-cols-5 gap-2">
		{#if Array.isArray(data.logtypes) && data.logtypes.length > 0}
			{#each data.logtypes as logtype}
				<a href="/log/add/{logtype.id}" class="rounded bg-{logtype.color} p-2 flex items-center justify-center" 
					title="{logtype.name}"><Icon name={logtype.icon} /></a
				>
			{/each}
		{/if}
	</div>

	<!-- Placeholder entry list -->
	<ul class="mt-4">
		{#if Array.isArray(data.entries) && data.entries.length > 0}
			{#each data.entries as item, index}
				<li class="bg-{item.log_types.color} flex gap-x-1 p-2">
					<a href='/log/edit/{item.log_entries.id}' class="flex p-2 gap-2">
					<Icon name={item.log_types.icon} />
					{item.log_entries.timestamp.toTimeString().slice(0,5)} &mdash; {item.log_types.name}
					{#if item.log_entries.note != '-'}
						({item.log_entries.note})
					{/if}
					</a>
				</li>
			{/each}
		{:else}
			<li>No data....</li>
		{/if}
	</ul>
</div>
