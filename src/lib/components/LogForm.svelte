<script lang="ts">
	import { enhance } from '$app/forms';
	import {
		formatDateForInput,
		formatTimeForInput,
	} from '$lib/utils/date';

	let { initialData = {}, action = 'create' } = $props<{
		initialData?: Partial<{ id: string; typeId: string; note: string, timestamp: Date }>;
		action?: 'create' | 'update';
	}>();

	const currentTimestamp = new Date();
	console.log('Current time: ',  currentTimestamp);
	const currentDateTime = currentTimestamp;
	
	let note = $state(initialData.note ?? '');

	let date = $state(formatDateForInput(currentDateTime));
	const { hour: hourStr, minute: minuteStr } = formatTimeForInput(currentDateTime);

	let hour = $state(hourStr);
	let minute = $state(minuteStr);

	if (initialData.timestamp) {
		const { hour: initialHourStr, minute: initialMinuteStr } = formatTimeForInput(
			initialData.timestamp
		);

		hour = initialHourStr;
		minute = initialMinuteStr;
		date = formatDateForInput(currentDateTime);
	}
</script>

<form method="POST" class="max-w-md space-y-4" use:enhance>
	{#if initialData.id}
		<input type="hidden" name="id" value={initialData.id} />
	{/if}

	<input type="hidden" name="typeId" value={initialData.typeId} />

	<div>
		<label class="block text-sm font-medium text-gray-700" for="date">Date</label>
		<input
			type="date"
			name="date"
			bind:value={date}
			required
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
		/>
	</div>

	<div class="time-picker">
		<select bind:value={hour} name="hour">
			{#each Array(24) as _, i}
				<option value={String(i).padStart(2, '0')}>
					{String(i).padStart(2, '0')}
				</option>
			{/each}
		</select>
		:
		<select bind:value={minute} name="minute">
			{#each Array(60) as _, i}
				<option value={String(i).padStart(2, '0')}>
					{String(i).padStart(2, '0')}
				</option>
			{/each}
		</select>
	</div>

	<div>
		<label class="block text-sm font-medium text-gray-700" for="note">Note</label>
		<textarea
			name="note"
			bind:value={note}
			maxlength="50"
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
		></textarea>
	</div>

	<div class="flex gap-4">
		<button
			id="btnFormSubmit"
			type="submit"
			formaction={`?/${action}`}
			class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
		>
			{action === 'update' ? 'Update' : 'Create'}
		</button>
		{#if initialData.id}
			<button
				id="btnDeleteForm"
				type="submit"
				formaction="?/delete"
				class="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
			>
				Delete
			</button>
		{/if}
	</div>
</form>
