<script lang="ts">
	import type { PageProps } from './$types';
	import LogForm from '$lib/components/LogForm.svelte';
	import Icon from '$lib/components/Icon.svelte';

	let { data }: PageProps = $props();
	let entry = Array.isArray(data?.entry) ? data.entry[0] : undefined;
	let logType = entry?.log_types ?? {};
	let initialData = entry?.log_entries ?? {};
	initialData.logTypeName = logType?.name;

	console.log('Entry is: ', initialData);
</script>

<div class="grid">
	<div class="mb-4 flex w-full p-2 bg-{logType?.color} mt-4">
		<div class="mr-2 flex rounded border p-2"><Icon name={logType?.icon} /></div>
		<div class="p-2">{logType?.name}</div>
	</div>
	<LogForm {initialData} action="update" />

	<hr class="mt-2" />
	<div class="mt-4">
		<a href="/log" class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">&lt;&lt; Back</a>
	</div>
</div>
