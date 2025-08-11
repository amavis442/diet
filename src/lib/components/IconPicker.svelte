<script lang="ts">
    import { IconMap } from './IconRegistry';
    import Icon from './Icon.svelte'; 

    const iconNames = Object.keys(IconMap);

	let selectedIcon = $state<string | null>(null);
	let { onSelect } = $props<{ onSelect?: (iconName: string) => void }>();

	function handleClick(iconName: string) {
		selectedIcon = iconName;
		onSelect?.(iconName);
	}


</script>

<div class="grid grid-cols-6 gap-2 w-full">
	{#each iconNames as name}
		{#key name}
		<div class="flex">
			<button
				class="border rounded p-2 hover:bg-white {selectedIcon === name ? 'bg-blue-700 text-white' : ''}"
				onclick={() => handleClick(name)}
			>
				<Icon name={name} />
			</button>
		</div>
		{/key}
	{/each}
</div>

