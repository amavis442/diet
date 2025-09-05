<script lang="ts">
	import '../../app.css';
	import favicon from '$lib/assets/favicon.svg';
	//import CircleAlert from '@lucide/svelte/icons/circle-alert';
	import { House,ClipboardClock, ChartColumnBig,Settings } from '@lucide/svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="fixed bottom-0 w-full bg-white shadow-md flex justify-around p-4 h-16">
    <a href="/dashboard/"><House /></a>
    <a href="/dashboard/log"><ClipboardClock/></a>
    <a href="/dashboard/stats"><ChartColumnBig /></a>
    <a href="/dashboard/settings"><Settings /></a>
</nav>


    <div class="flex justify-center">
        {@render children?.()}
    </div>
