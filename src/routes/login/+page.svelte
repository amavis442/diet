<script lang="ts">
	import { enhance } from '$app/forms';

	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="flex min-h-full w-full flex-col justify-center px-6 py-12 lg:px-8">
	
	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<h1 class="">Sign in</h1>
		<form method="post" class="space-y-6 mb-4" use:enhance>
			<div>
				<label for="form-login.email" class="block text-sm/6 font-medium text-gray-900"
					>Username</label
				>
				<input
					type="text"
					id="username"
					name="username"
					autocomplete="username"
					required
					value={form?.username ?? ''}
					class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
				/>
			</div>

			<div>
				<label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					autocomplete="current-password"
					required
					class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
				/>
			</div>
			<div>
				<button class="border bg-blue-500 rounded-lg p-2 text-white">Continue</button>
				<p>{form?.message ?? ''}</p>
			</div>
		</form>
		<a href="/register" class="border bg-blue-500 rounded-lg p-2 text-white">Register</a>
		<!--// <a href="/forgot-password">Forgot password?</a> //-->
	</div>
</div>
