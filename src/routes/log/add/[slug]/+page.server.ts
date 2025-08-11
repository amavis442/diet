import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';
import { logTypes } from '$lib/server/db/schema/log_types';
import { logEntries } from '$lib/server/db/schema/log_entries';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import type { Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {

	let id = params.slug;

	if (typeof id !== 'string') return fail(400, { error: 'Missing ID' });
	
	const logTypeRaw = await db.select().from(logTypes).where(eq(logTypes.id, id));
	if (logTypeRaw) {
		let logType = logTypeRaw[0];

		return {
			title: 'Hello world!' + params.slug,
			content: 'Welcome to our blog. Lorem ipsum dolor sit amet...',
			logType: logType,
		};
	}

	error(404, 'Not found');
};

const schema = z.object({
    typeId: z.string().min(1).max(50),
	timestamp: z.date(),
    note: z.string().min(1),
});

export const actions = {
    create: async ({ request }) => {
        const form = await request.formData();
        const typeId = form.get('typeId') as string;
        let note = form.get('note') as string;
        const dateStr = form.get('date') as string; // e.g. "2025-08-11"
        const hourStr = form.get('hour') as string; 
        const minuteStr = form.get('minute') as string; 
        
        if (!note ||note.length < 1) {
            note = "-";
        }
        //const [year, month, day] = dateStr.split('-').map(Number);
        //const hour = Number(hourStr);
        //const minute = Number(minuteStr);
        
        // Construct local Date object
        //const localTimestamp = new Date(year, month - 1, day, hour, minute, 0);
        const timestampString = `${dateStr} ${hourStr}:${minuteStr}:00`; // "2025-08-11 15:22:00"

        console.log("Create a new log entry", typeId, note, timestampString, form, request);
        const timestamp = new Date(timestampString);

        const offsetMinutes = new Date().getTimezoneOffset(); // e.g. -120 for +2 hours
        const offsetHours = -offsetMinutes / 60;

        timestamp.setHours(timestamp.getHours() + offsetHours);


        const result = schema.safeParse({ typeId, timestamp, note });
        if (!result.success) {
            return fail(400, { error: 'Invalid input' });
        }

        await db.insert(logEntries).values(result.data);
        throw redirect(303, '/log');
    },
} satisfies Actions;