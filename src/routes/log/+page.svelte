<script lang="ts">
    import Icon from '$lib/components/Icon.svelte';
    let {data} = $props();

    //console.log(data.logRaw[0].log_entries.note);
	const selectedDate = $state(new Date());
</script>

<div class="grid gap-4">
<h1 class="text-xl font-bold my-4">Daily Log: {selectedDate.toDateString()}</h1>

<!-- Icons to add entry -->
<div class="grid grid-cols-5 gap-2">
    <button>🛏️</button>
    <button>☕</button>
    <button>🍽️</button>
    <button>🚽</button>
    <button>💊</button>
</div>

<!-- Placeholder entry list -->
<ul class="mt-4">
    <li>☕ 08:30 — Black coffee</li>
    <li>🍽️ 12:15 — Steak & eggs</li>
    {#if Array.isArray(data.logRaw) && data.logRaw.length > 0}
        {#each data.logRaw as item}
            <li class="bg-{item.log_types.color} flex p-2 gap-x-1"><Icon name={item.log_types.icon}/> {item.log_entries.timestamp.toISOString().slice(11,16)} &mdash; {item.log_types.name} ({item.log_entries.note})</li>
        {/each}
    {:else}
        <li>No data....</li>
    {/if}
</ul>

</div>