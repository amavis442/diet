<script lang="ts">
	import { Plus } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import Icon from '$lib/components/Icon.svelte';

	let { data }: PageProps = $props();
	let availableTags = data.availableTags;
</script>

<div class="grid">
	<div>
		<h1 class="my-4</div> text-xl font-bold">Tags</h1>
	</div>

	<div class="flex mb-4 mt-4"><a href="/dashboard/tags/add" class="rounded-lg border bg-blue-500 p-2 flex text-white"><Plus /> Add</a></div>
	<div class="mt-4">
		<ul class="space-y-2 ">
			{#each availableTags as tag, index}
				<li class="flex items-center gap-2 p-4">
					<span><a href="/dashboard/tags/edit/{tag.id}">{tag.id}</a></span>
					<span class="font-medium">{tag.label}</span>
				</li>
			{/each}
		</ul>
	</div>
</div>
