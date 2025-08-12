import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { logTypes } from '$lib/server/db/schema/log_types';
import { logEntries } from '$lib/server/db/schema/log_entries';
import { eq, sql, asc, desc } from 'drizzle-orm';
import {adjustForLocalTime} from '$lib/utils/date';

export const load = (async () => {

    //const targetDate = new Date().toLocaleDateString('nl-NL');// .toISOString().slice(0, 10);
    
    const currentDate = new Date(); // UTC TIME
    const targetDate = currentDate.toISOString().slice(0, 10);
    console.log('Target date: ', targetDate);

    const logRaw = await db.select().from(logEntries)
        .innerJoin(logTypes, eq(logEntries.typeId, logTypes.id))
        .where(sql`DATE(${logEntries.timestamp}) = ${targetDate}`).orderBy(asc(logEntries.timestamp));

    const allLogTypes = await db.select().from(logTypes);

    //console.log(logRaw, targetDate);

    // Check if logRaw is a non-empty array
    if (Array.isArray(logRaw) && logRaw.length > 0) {
        const result = { entries: logRaw, logtypes: allLogTypes }; 
        //console.log(result);
        return { entries: logRaw, logtypes: allLogTypes };

    } else if (Array.isArray(allLogTypes) && allLogTypes.length > 0) {
        const result = { entries: [], logtypes: allLogTypes }; 
        return { entries: logRaw, logtypes: allLogTypes };
    } else {
        // Return a fallback or empty structure
        return {
            entries: [],
            message: `No log entries found for ${targetDate}`
        };
    }
}) satisfies PageServerLoad;