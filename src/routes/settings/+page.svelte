<script>
	import { Plus } from '@lucide/svelte';

	const selectedDate = $state(new Date());
</script>

<div>
	<h1 class="my-4 text-xl font-bold">Settings</h1>

	<ul>
		<li>🔧 Customize icons</li>
		<li><a href="/log-types"><Plus />Add new item types</a></li>
		<li>🔔 Toggle notifications</li>
	</ul>
</div>
