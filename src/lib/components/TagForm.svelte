<script lang="ts">
	import { enhance } from '$app/forms';

	let {
		initialData = {},
		action = 'create',
	} = $props<{
		initialData?: Partial<{ id: string; label: string;  }>;
		action?: 'create' | 'update';

	}>();

	let label = $state(initialData.label ?? '');
</script>

<form method="POST" class="max-w-md space-y-4" use:enhance>
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
