import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { logTypes } from '$lib/server/db/schema/log_types';
import { logEntries } from '$lib/server/db/schema/log_entries';
import { tags } from '$lib/server/db/schema/tags';
import { logTag } from '$lib/server/db/schema/log_tag';
import { saveTagsForEntry } from '$lib/server/db/utils/saveTags';

import { z } from 'zod';
import { eq } from 'drizzle-orm';


const schema = z.object({
    typeId: z.string().min(1).max(50),
    timestamp: z.date(),
    note: z.string().min(1),
    description: z.string(),
    score: z.number()
});

export const load = (async ({ locals, params }) => {
    const id: string = params.id;

    if (typeof id !== 'string') return fail(400, { error: 'Missing ID' });

    const logRaw = await db.select().from(logEntries)
        .innerJoin(logTypes, eq(logEntries.typeId, logTypes.id))
        .where(eq(logEntries.id, params.id));

    const tagRows = await db
        .select()
        .from(logTag)
        .innerJoin(tags, eq(logTag.tagId, tags.id))
        .where(eq(logTag.entryId, id));

    const allTags = await db.select().from(tags);
    const allLogTypes = await db.select().from(logTypes);

    console.log(logRaw);

    // Check if logRaw is a non-empty array
    if (Array.isArray(logRaw) && logRaw.length > 0) {
        const entry = logRaw[0];
        //entry.log_entries.timestamp = formatInTimeZone(entry.log_entries.timestamp,'Europe/Amsterdam',"yyyy-MM-dd'T'HH:mm:ss");

        const result = {
            entry: entry,
            selectTags: tagRows.map(row => row.tags),
            logtypes: allLogTypes,
            tags: allTags,
            selectedTagIds: tagRows.map(row => row.tags.id)
        };
        console.log('Result is:', result);
        return result;
    } else {
        // Return a fallback or empty structure
        return {
            entry: {},
            logtypes: [],
            selectedTags: [],
            tags: [],
            selectedTagIds: [],
            message: `No log entry found for ${params.id}`
        };
    }
}) satisfies PageServerLoad;

export const actions = {
    update: async ({ request }) => {
        const form = await request.formData();
        const id = form.get('id') as string;
        const typeId = form.get('typeId') as string;
        let note = form.get('note') as string;
        let description = form.get('description') as string;
        let scoreStr = form.get('score') as string;
        let score: Number = scoreStr ? Number(scoreStr) : Number(4);
        const dateStr = form.get('date') as string; // e.g. "2025-08-11"
        const hourStr = form.get('hour') as string;
        const minuteStr = form.get('minute') as string;

        let tags = form.getAll('tags');// .get('tags') as string;
        console.log('Form tags:', tags);

        if (typeof id !== 'string') return fail(400, { error: 'Missing ID' });

        if (!note || note.length < 1) {
            note = "-";
        }

        if (!description || description.length < 1) {
            description = "-";
        }

        const timestampString = `${dateStr} ${hourStr}:${minuteStr}:00`;

        console.log("Update log entry", typeId, note, timestampString, form, request);
        const localDate = new Date(timestampString); // Translates date to UTC time
        console.log('To UTC: ', localDate);

        const unixMillis = localDate.getTime(); // milliseconds
        const unixSeconds = Math.floor(unixMillis / 1000); // seconds

        const result = schema.safeParse({ typeId, timestamp: localDate, note, unix: unixSeconds, description, score });
        if (!result.success) {
            console.log("Failed to update log entry", result);
            return fail(400, { error: 'Invalid input' });
        }

        await db.update(logEntries).set({ typeId: result.data.typeId, note: result.data.note, description: result.data.description, score: result.data.score, timestamp: result.data.timestamp }).where(eq(logEntries.id, id));

        saveTagsForEntry(id, tags);

        throw redirect(303, '/dashboard/log');
    },
    delete: async ({ request }) => {
        const form = await request.formData();
        const id = form.get('id');
        if (typeof id !== 'string') return fail(400, { error: 'Missing ID' });

        await db.delete(logTag).where(eq(logTag.entryId, id));

        await db.delete(logEntries).where(eq(logEntries.id, id));
        throw redirect(303, '/dashboard/log');
    }
} satisfies Actions;