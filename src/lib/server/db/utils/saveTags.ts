import { db } from '$lib/server/db';
import { logTag } from '$lib/server/db/schema/log_tag';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const logTagSchema = z.object({
    entryId: z.string().min(1).max(50),
    tagId: z.string().min(1).max(50)
});

export async function saveTagsForEntry(entryId: string, tagIds: FormDataEntryValue[]) {
    // Clear existing tags
    await db.delete(logTag).where(eq(logTag.entryId, entryId));

    // Insert new tags
    for (const tagId of tagIds) {
        const tagEntry = {
            entryId,
            tagId: tagId.toString()
        };

        const validation = logTagSchema.safeParse(tagEntry);
        if (!validation.success) {
            console.warn('Invalid tag entry skipped:', tagEntry);
            continue;
        }

        await db.insert(logTag).values(tagEntry);
    }
}