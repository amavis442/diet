<script lang="ts">
	import LogTypeForm from '$lib/components/LogTypeForm.svelte';
	import IconPicker from '$lib/components/IconPicker.svelte';
	import ColorPicker from '$lib/components/ColorPicker.svelte';	

	let chosenIcon = $state<string>('');
	let chosenColor = $state<string>('blue-100');
	
	$effect(() => {
		console.log(chosenIcon);
	});

	let initialData = $derived({icon: chosenIcon, name: '', color: chosenColor});
</script>

<div class="grid gap-1">
<LogTypeForm action="create" {initialData} selectedIcon={chosenIcon ?? 'Alert'} selectedColor={chosenColor ?? 'blue-100'}/>

<div class="w-full rounded border p-2">
	<IconPicker onSelect={(name: string) => (chosenIcon = name)} />
</div>

<div class="w-full rounded border p-2">
	<ColorPicker onSelect={(color: string) => (chosenColor = color)} selected={chosenColor}/>
</div>

<div><a href="/dashboard/log-types">Back</a></div>
</div>