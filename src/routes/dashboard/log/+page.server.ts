import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { logTypes } from '$lib/server/db/schema/log_types';
import { logEntries } from '$lib/server/db/schema/log_entries';
import { eq, sql, asc } from 'drizzle-orm';
import { getUTCRangeForLocalDay, getUTCRange } from '$lib/utils/date';
import { redirect } from '@sveltejs/kit';

async function getEntriesForDate(currentDate: Date) {
    const { startUTC: localStart, endUTC: localEnd } = getUTCRange(currentDate);
    const result = getUTCRangeForLocalDay(currentDate, 'Europe/Amsterdam');

    //console.log(localStart.toISOString(), localEnd.toISOString(), result);
    const logRaw = await db.select().from(logEntries)
        .innerJoin(logTypes, eq(logEntries.typeId, logTypes.id))
        .where(sql`timestamp BETWEEN ${localStart.toISOString()} AND ${localEnd.toISOString()}`).orderBy(asc(logEntries.timestamp));

    const allLogTypes = await db.select().from(logTypes);

    // Check if logRaw is a non-empty array
    if (Array.isArray(logRaw) && logRaw.length > 0) {
        const result = { entries: logRaw, logtypes: allLogTypes, date: currentDate };
        //console.log(result);
        return { entries: logRaw, logtypes: allLogTypes };

    } else if (Array.isArray(allLogTypes) && allLogTypes.length > 0) {
        return { entries: [], logtypes: allLogTypes, date: currentDate };
    } else {
        // Return a fallback or empty structure
        return {
            entries: [],
            message: `No log entries found for ${currentDate}`,
            date: currentDate
        };
    }
}

export const load = (async ({ locals, url }) => {
    if (!locals.user) {
        throw redirect(303, '/dashboard/login');
    }

    let date = url.searchParams.get('date')?.toString() ?? '';
    if (date.length > 0) {
        const selectedDate = new Date(date);
        return await getEntriesForDate(selectedDate);
    }

    const currentDate = new Date(); // UTC TIME

    return await getEntriesForDate(currentDate);
}) satisfies PageServerLoad;


export const actions = {
    updateDate: async ({ request }) => {
        const formData = await request.formData();
        const selectedDate = formData.get('date')?.toString();

        if (selectedDate) {
            const d = new Date(selectedDate);

            const result = await getEntriesForDate(d);
            console.log('UpdateData: ', result);

            return result;
        }

        // Do something with the date, e.g. fetch filtered data
        //const logs = await getLogsForDate(selectedDate);
        let logs = {};
        console.log("DEZE WORDT AANGEROEPEN", selectedDate);
        return { logs };
    }
} satisfies Actions;