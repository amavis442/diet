import { error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';
import { logTypes } from '$lib/server/db/schema/log_types';
import { tags } from '$lib/server/db/schema/tags';
import { logEntries } from '$lib/server/db/schema/log_entries';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { localTimeToUTC } from '$lib/utils/date';
import { saveTagsForEntry } from '$lib/server/db/utils/saveTags';

export const load: PageServerLoad = (async ({ locals, params }) => {
    if (locals.session === null || locals.user === null) {
        throw redirect(303, '/login');
    }

    let id = params.slug;

    if (typeof id !== 'string') return fail(400, { error: 'Missing ID' });

    const allTags = await db.select().from(tags);

    const logTypeRaw = await db.select().from(logTypes).where(eq(logTypes.id, id));
    if (logTypeRaw) {
        let logType = logTypeRaw[0];

        return {
            logType: logType,
            tags: allTags
        };
    }

    error(404, 'Not found');
}) satisfies PageServerLoad;

const schema = z.object({
    typeId: z.string().min(1).max(50),
    timestamp: z.date(),
    unix: z.number(),
    note: z.string().min(1),
    description: z.string(),
    score: z.number()
});

export const actions = {
    create: async ({ request }) => {
        const form = await request.formData();
        const typeId = form.get('typeId') as string;
        let note = form.get('note') as string;

        let description = form.get('description') as string;
        let scoreStr = form.get('score') as string;
        let score: Number = scoreStr ? Number(scoreStr) : Number(4);
        let tags = form.getAll('tags');

        const dateStr = form.get('date') as string; // e.g. "2025-08-11"
        const hourStr = form.get('hour') as string;
        const minuteStr = form.get('minute') as string;

        if (!note || note.length < 1) {
            note = "-";
        }

        if (!description || description.length < 1) {
            description = "-";
        }

        // Construct local Date object
        //const localTimestamp = new Date(year, month - 1, day, hour, minute, 0);
        const timestampString = `${dateStr}T${hourStr}:${minuteStr}:00`;

        console.log("Create a new log entry", typeId, note, timestampString, form, request);
        const localDate = new Date(timestampString); // Translates date to UTC time
        console.log('To UTC: ', localDate);


        const unixMillis = localDate.getTime(); // milliseconds
        const unixSeconds = Math.floor(unixMillis / 1000); // seconds
        const result = schema.safeParse({ typeId, timestamp: localDate, note, unix: unixSeconds, description, score });
        console.log(result.data);


        if (!result.success) {
            return fail(400, { error: 'Invalid input' });
        }

        const inserted = await db.insert(logEntries).values(result.data).returning({ id: logEntries.id });

        const newId = inserted[0]?.id;
        if (newId) {
            await saveTagsForEntry(newId, tags);
        }

        throw redirect(303, '/dashboard/log');
    },
} satisfies Actions;