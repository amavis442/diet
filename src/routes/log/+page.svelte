<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { format } from 'date-fns';
	import { DatePicker } from '@svelte-plugins/datepicker';
	import { goto } from '$app/navigation';

	let { data } = $props();

	let startDate = $state(new Date());
	let dateFormat = 'MM/dd/yy';
	let isOpen = $state(false);

	let entries = $derived(data.entries);

	const toggleDatePicker = () => (isOpen = !isOpen);

	const formatDate = (dateString: Date) => {
		return (dateString && format(new Date(dateString), dateFormat)) || '';
	};

	let initialized = $state(false);
	$effect(() => {
		if (!initialized) {
			initialized = true;
			return;
		}
		if (startDate) {
			console.log('startDate changed:', startDate);
			const isoDate = format(new Date(startDate), 'yyyy-MM-dd');
			console.log('iso date is: ', isoDate);
			goto(`?date=${isoDate}`);
		}
	});

	let formattedStartDate = $derived(formatDate(startDate));

	const selectedDate = $derived(data?.date ?? new Date());
</script>

<div class="flex flex-col h-full p-4 gap-4">
	<h1 class="my-4 text-xl font-bold">Daily Log: {format(selectedDate, 'yyyy MMMM dd, EEEE')}</h1>

	<DatePicker bind:isOpen bind:startDate>
		<input
			type="text"
			placeholder="Select date"
			bind:value={formattedStartDate}
			onclick={toggleDatePicker}
		/>
	</DatePicker>

	<!-- Icons to add entry -->
	<div class="grid grid-cols-5 gap-2">
		{#if Array.isArray(data.logtypes) && data.logtypes.length > 0}
			{#each data.logtypes as logtype}
				<a
					href="/log/add/{logtype.id}"
					class="rounded bg-{logtype.color} flex items-center justify-center p-2"
					title={logtype.name}><Icon name={logtype.icon} /></a
				>
			{/each}
		{/if}
	</div>

	<!-- Placeholder entry list -->
	<div class="flex-grow overflow-y-auto border rounded h-140">
		<ul class="mt-4">
			{#if Array.isArray(entries) && entries.length > 0}
				{#each entries as item, index}
					<li class="bg-{item.log_types.color} flex gap-x-1 p-2">
						<a href="/log/edit/{item.log_entries.id}" class="flex gap-2 p-2">
							<Icon name={item.log_types.icon} />
							{item.log_entries.timestamp.toTimeString().slice(0, 5)} &mdash; {item.log_types.name}
							{#if item.log_entries.note != '-'}
								({item.log_entries.note})
							{/if}
						</a>
					</li>
				{/each}
			{:else}
				<li>No data....</li>
			{/if}
		</ul>
	</div>
</div>
