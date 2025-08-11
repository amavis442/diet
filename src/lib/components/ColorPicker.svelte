<script lang="ts">
    import { tailwindColors } from './colors';
    //let selected: string = $state<string>('');
    let { onSelect, selected } = $props<{ onSelect?: (color: string) => void, selected:string }>();
</script>

<div class="grid grid-cols-6 gap-2">
    {#each tailwindColors as color}
        <button
            class={`w-8 h-8 rounded-full border-2 ${
                selected === color ? 'border-black' : 'border-transparent'
            } bg-${color}`}
            onclick={() => onSelect(color)}
            aria-label={color}
        ></button>
    {/each}
</div>
