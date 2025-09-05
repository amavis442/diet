<script>
	import { Pen, Wrench, Bell, Tag } from '@lucide/svelte';

	const selectedDate = $state(new Date());
</script>

<div class="mt-10 flex flex-col w-1/2">
	<div class="justify-items-center w-full">
		<h1 class="my-4 text-xl font-bold">Settings</h1>
	</div>

	<div class="justify-items-center w-full">
		<ul class="grid gap-4">
			<li class="p-2 hover:bg-amber-200 rounded"><div class="flex"><Wrench class="pr-2"/> Customize icons</div></li>
			<li  class="p-2 hover:bg-amber-200 rounded"><div class="flex"><a href="/dashboard/log-types" class="flex"><Pen class="pr-2"/>Admin Log types</a></div></li>
			<li  class="p-2 hover:bg-amber-200 rounded"><div class="flex"><a href="/dashboard/tags" class="flex"><Tag class="pr-2"/>Admin tags</a></div></li>
			<li  class="p-2 hover:bg-amber-200 rounded"><div class="flex"><Bell class="pr-2"/> Toggle notifications</div></li>
		</ul>
	</div>
</div>
