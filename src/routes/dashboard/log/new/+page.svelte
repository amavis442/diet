<script lang="ts">
	import LogTypeForm from '$lib/components/LogTypeForm.svelte';
	import IconPicker from '$lib/components/IconPicker.svelte';
	let chosenIcon = '';
</script>

<div class="grid w-1/2">
	<LogTypeForm action="create" selectedIcon="" selectedColor="" />

	<div class="w-full rounded border">
		<IconPicker onSelect={(name: string) => (chosenIcon = name)} />
	</div>
</div>
