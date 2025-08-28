<script lang="ts">
	import type { PageProps } from './$types';
	import LogForm from '$lib/components/LogForm.svelte';
	import Icon from '$lib/components/Icon.svelte';

	let { data }: PageProps = $props();

	console.log('Data: ', data);

	type LogEntry = {
		id: string;
		typeId: string;
		timestamp: Date;
		unix: number;
		note: string | null;
		description: string | null;
		score: number;
	};

	type LogType = {
		id: string;
		name: string;
		icon: string;
		color: string;
	};

	type LogEntryData = {
		log_entries: LogEntry;
		log_types: LogType;
	};

	type InitialData = Partial<{
		id: string;
		typeId: string;
		logTypeName: string;
		note: string;
		description: string;
		score: number;
		timestamp: Date;
		selectedTags: { id: string; label: string }[];
		selectedTagIds: string[];
	}>;

	function isLogEntryData(obj: unknown): obj is LogEntryData {
		return typeof obj === 'object' && obj !== null && 'log_entries' in obj && 'log_types' in obj;
	}

	function isLogType(obj: unknown): obj is LogType {
		return (
			typeof obj === 'object' &&
			obj !== null &&
			'id' in obj &&
			'name' in obj &&
			'icon' in obj &&
			'color' in obj
		);
	}

	//let entry = Array.isArray(data?.entry) ? data.entry[0] : undefined;
	let entry: LogEntryData | {} | undefined = data?.entry ? data.entry : undefined;

	console.log('Entry:', data.entry);

	let logType: LogType | {} = isLogEntryData(entry) ? entry.log_types : {};
	let logEntry: LogEntry | {} = isLogEntryData(entry) ? entry.log_entries : {};

	let initialData: InitialData = logEntry as InitialData;

	let tags = data.tags ?? [];
	let bgColor = $state('white');
	let icon = $state('');
	
	initialData.logTypeName = '';
	if (isLogType(logType)) {
		initialData.logTypeName = logType.name;
		bgColor = logType.color;
		icon = logType.icon;
	}
	initialData.selectedTags = data.selectedTags ?? [];
	initialData.selectedTagIds = data.selectedTagIds ?? [];

	console.log('InitialData is: ', initialData);
</script>

<div class="grid">
	<div class="mb-4 flex w-full p-2 bg-{bgColor} mt-4">
		<div class="mr-2 flex rounded border p-2"><Icon name={icon} /></div>
		<div class="p-2">{initialData.logTypeName}</div>
	</div>
	<LogForm {initialData} {tags} action="update" />

	<hr class="mt-2" />
	<div class="mt-4">
		<a href="/log" class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
			>&lt;&lt; Back</a
		>
	</div>
</div>
