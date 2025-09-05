<script lang="ts">
	import TagForm from '$lib/components/TagForm.svelte';

	let tagInUse = false;
	let tagId = '';
	let count = 0;

	let initialData = $derived({label: ''});
</script>

<div class="grid gap-1">
<TagForm action="create" {initialData} {tagInUse} {tagId} {count}/>

<div><a href="/dashboard/tags">Back</a></div>
</div>