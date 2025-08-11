<script lang="ts">
    let {score} = $props();
</script>

<div>
    <div>Place holder toilet</div>
    {#each {length: 7}, item}
        {#if item == score }
            <div class="font-bold">{item}</div>
        {:else}
            <div>{item}</div>
        {/if}
    {/each}
</div>