import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { logEntries } from '$lib/server/db/schema/log_entries';
import { logTag } from '$lib/server/db/schema/log_tag';
import { logTypes } from '$lib/server/db/schema/log_types';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params }) => {
  if (locals.session === null || locals.user === null) {
    throw redirect(303, '/login');
  }

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
