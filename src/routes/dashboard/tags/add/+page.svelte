<script lang="ts">
	import TagForm from '$lib/components/TagForm.svelte';

	let initialData = $derived({label: ''});
</script>

<div class="grid gap-1">
<TagForm action="create" {initialData} />

<div><a href="/tags">Back</a></div>
</div>