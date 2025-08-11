<script lang="ts">
	import type { PageProps } from './$types';
	import LogForm from '$lib/components/LogForm.svelte';
	import Icon from '$lib/components/Icon.svelte';

	let { data }: PageProps = $props();
	let logType = data.logType;

	let initialData = { typeId: logType?.id };
	console.log(data);
</script>

<div class="grid">
	<div class="mb-4 flex w-full p-2">
		<div class="p-2"><Icon name={logType?.icon} /></div>
		{logType?.name}
	</div>
	<LogForm {initialData} />

	<a href="/">Back</a>
</div>
