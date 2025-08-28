import type { PageServerLoad } from '../$types';
import { db } from '$lib/server/db';
import { logEntries } from '$lib/server/db/schema/log_entries';
import { logTag } from '$lib/server/db/schema/log_tag';
import { logTypes } from '$lib/server/db/schema/log_types';
import type { Actions } from '../$types';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

const schema = z.object({
    name: z.string().min(1).max(50),
    icon: z.string().min(1),
});


export const load: PageServerLoad = async ({ params }) => {
    const targetTagId = params.tag;
    //const logTags = await db.select().from(logTag).where(eq(logTag.tagId, tagId));

    
    const entriesWithTag = await db
      .select()
      .from(logEntries)
      .innerJoin(logTag, eq(logEntries.id, logTag.entryId))
      .innerJoin(logTypes, eq(logEntries.typeId, logTypes.id))
      .where(eq(logTag.tagId, targetTagId));
    


    return {
        entries: entriesWithTag
    };
};
