import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { logTypes } from '$lib/server/db/schema/log_types';
import { logEntries } from '$lib/server/db/schema/log_entries';
import { z } from 'zod';
import { eq, sql, asc, desc } from 'drizzle-orm';

export const load = (async () => {

    //const targetDate = new Date().toLocaleDateString('nl-NL');// .toISOString().slice(0, 10);
    const targetDate = new Date().toISOString().slice(0, 10);

    const logRaw = await db.select().from(logEntries)
        .innerJoin(logTypes, eq(logEntries.typeId, logTypes.id))
        .where(sql`DATE(${logEntries.timestamp}) = ${targetDate}`).orderBy(asc(logEntries.timestamp));

    console.log(logRaw, targetDate);

    /* const logTypeRaw = await db.select().from(logTypes).where(eq(logTypes.id, id));
    if (logTypeRaw) {
        let logType = logTypeRaw[0];

        return {
            title: 'Hello world!' + params.slug,
            content: 'Welcome to our blog. Lorem ipsum dolor sit amet...',
            logType: logType,
        };
    }
    */
    // Check if logRaw is a non-empty array
    if (Array.isArray(logRaw) && logRaw.length > 0) {
        return { logRaw };
    } else {
        // Return a fallback or empty structure
        return {
            logRaw: [],
            message: `No log entries found for ${targetDate}`
        };
    }
}) satisfies PageServerLoad;