<script lang="ts">
    import {IconMap} from './IconRegistry';

    let {name} = $props();

</script>

{#if name && IconMap[name]}
    {@const Icon = IconMap[name]}
    <Icon size={24} />
{:else}
    <span>No icon found</span>
{/if}