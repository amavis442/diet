<script lang="ts">
	import '../../app.css';
	import favicon from '$lib/assets/favicon.svg';
	//import CircleAlert from '@lucide/svelte/icons/circle-alert';
	import { House,ClipboardClock, ChartColumnBig,Settings, LogOut } from '@lucide/svelte';
    import { enhance } from "$app/forms";

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
    <form method="post" use:enhance action="/logout">
		<button title="Sign out"><LogOut /></button>
	</form>
</nav>


    <div class="flex justify-center w-full">
        {@render children?.()}
    </div>
