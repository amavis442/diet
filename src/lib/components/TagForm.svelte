<script lang="ts">
	import { enhance } from '$app/forms';

	let {
		initialData = {},
		action = 'create',
		tagInUse = false,
		count = 0,
		tagId = ''
	} = $props<{
		initialData?: Partial<{ id: string; label: string }>;
		action?: 'create' | 'update';
		tagInUse: true | false;
		tagId: string;
		count: number;
	}>();

	$effect(() => {
		console.log(tagInUse);
	});
	let label = $state(initialData.label ?? '');
</script>

{#if tagInUse}
	<div class="rounded bg-yellow-100 p-4 text-yellow-800">
		<strong>Cannot delete tag:</strong> This tag is used in {count} log entries and cannot be removed.
		<br />
		<a href={`/admin/logs/${tagId}`} class="text-blue-600 underline">View linked entries</a>
	</div>
{/if}

<form
	method="POST"
	class="max-w-md space-y-4"
	use:enhance={() => {
		return async ({ result, update }) => {
			if (result.type === 'failure' && result.data?.tagInUse) {
				// Handle tag-in-use warning here
				tagInUse = true;
				count = result.data.count;
				tagId = result.data.tagId;
			}

			// Optionally apply default behavior
			update(); // resets form, invalidates data, etc.
		};
	}}
>
	{#if initialData.id}
		<input type="hidden" name="id" value={initialData.id} />
	{/if}

	<div>
		<label class="block text-sm font-medium text-gray-700" for="name">Label</label>
		<input
			name="label"
			bind:value={label}
			maxlength="50"
			required
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
		/>
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
