<script lang="ts">
	import TagForm from '$lib/components/TagForm.svelte';
	import type { Tag } from '$lib/server/db/schema.js';

	let { data } = $props();
	let tag: Tag = data.logType[0];

	let tagInUse = $state(data?.tagInUse ?? false);
	let tagId = $state(data?.tagId ?? '');
	let count = $state(data?.count ?? 0);

	$effect(() => {
		console.log(tagInUse);
	});

	let initialData = $derived({ id: tag.id, label: tag.label });
</script>

<div class="grid gap-1">
	{#if data?.tagInUse}
		<div class="rounded bg-yellow-100 p-4 text-yellow-800">
			<strong>Cannot delete tag:</strong> This tag is used in {data.count} log entries and cannot be
			removed.
			<br />
			<a href={`/dashboard/admin/logs?tag=${data.tagId}`} class="text-blue-600 underline"
				>View linked entries</a
			>
		</div>
	{/if}

	<TagForm action="update" {initialData} {tagInUse} {tagId} {count}/>

	<div><a href="/dashboard/tags">Back</a></div>
</div>
