<script lang="ts">
	import LogTypeForm from '$lib/components/LogTypeForm.svelte';
	import IconPicker from '$lib/components/IconPicker.svelte';
	import ColorPicker from '$lib/components/ColorPicker.svelte';	
	import type { LogType } from '$lib/server/db/schema.js';
	
	let chosenIcon = $state<string>('');
	let chosenColor = $state<string>('blue-100');

	$effect(() => {
		console.log(chosenIcon);
	});

	let { data } = $props();
	let logType: LogType = data.logType[0];

	let initialData = $derived({id: logType.id, icon: logType.icon, name: logType.name, color: logType.color});

	chosenIcon = logType.icon;
	chosenColor = logType.color;
</script>

<div class="grid gap-1">
	<LogTypeForm action="update" {initialData} selectedIcon={chosenIcon ?? 'Alert'} selectedColor={chosenColor ?? 'blue-100'}/>

	<div class="w-full rounded border">
		<IconPicker onSelect={(name: string) => (chosenIcon = name)} />
	</div>

	<div class="w-full rounded border p-2">
		<ColorPicker onSelect={(color: string) => (chosenColor = color)} selected={chosenColor}/>
	</div>

	<div><a href="/dashboard/log-types">Back</a></div>
</div>
