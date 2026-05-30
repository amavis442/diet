import { db } from '$lib/server/db';
import { logTag } from '$lib/server/db/schema/log_tag';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const logTagSchema = z.object({
    entryId: z.string().min(1).max(50),
    tagId: z.string().min(1).max(50)
});

export async function saveTagsForEntry(entryId: string, tagIds: FormDataEntryValue[]) {
    await db.delete(logTag).where(eq(logTag.entryId, entryId));

    const validEntries = tagIds
        .map(tagId => ({ entryId, tagId: tagId.toString() }))
        .filter(entry => {
            const result = logTagSchema.safeParse(entry);
            if (!result.success) {
                console.warn('Invalid tag entry skipped:', entry);
            }
            return result.success;
        });

    if (validEntries.length > 0) {
        await db.insert(logTag).values(validEntries);
    }
}
