<script lang="ts">
	import TagForm from '$lib/components/TagForm.svelte';
	import type { Tag } from '$lib/server/db/schema.js';
	

	let { data } = $props();
	let tag: Tag = data.logType[0];

	let initialData = $derived({id: tag.id, label: tag.label});

</script>

<div class="grid gap-1">
	<TagForm action="update" {initialData} />

	<div><a href="/tags">Back</a></div>
</div>
