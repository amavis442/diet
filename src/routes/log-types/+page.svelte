<script lang="ts">
	import { Plus } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import Icon from '$lib/components/Icon.svelte';


	let { data }: PageProps = $props();
	let availableLogTypes = data.availableLogTypes;
</script>

<div class="grid">
	<div>
		<h1 class="my-4</div> text-xl font-bold">Log Types</h1>
	</div>

	<div class="flex mb-4 mt-4"><a href="/log-types/new" class="rounded-lg border bg-blue-500 p-2 flex text-white"><Plus /> Add</a></div>
	<div class="mt-4">
		<ul class="space-y-2 ">
			{#each availableLogTypes as logType, index}
				<li class="flex items-center gap-2 bg-{logType.color} p-4">
					<span><a href="/log-types/edit/{logType.id}">{logType.id}</a></span>
					<span><Icon name={logType.icon}/></span>
					<span class="font-medium">{logType.name}</span>
				</li>
			{/each}
		</ul>
	</div>
</div>
