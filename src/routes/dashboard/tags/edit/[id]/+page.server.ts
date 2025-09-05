import type { PageServerLoad, Actions, RequestEvent } from './$types';
import { db } from '$lib/server/db';
import { tags } from '$lib/server/db/schema/tags';
import { logTag } from '$lib/server/db/schema/log_tag';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

const schema = z.object({
    label: z.string().min(1).max(50),
});


export const load: PageServerLoad = async (event: RequestEvent) => {
    const params = event.params;
    console.log('Params are:', params);
    let id = params.id;

    const logType = await db.select().from(tags).where(eq(tags.id, id));
    return { logType, tagInUse: false, count: 0, tagId: '' };
};

export const actions = {
    update: async (event: RequestEvent) => {
        const request = event.request;
        const form = await request.formData();
        const id = form.get('id') as string;
        const label = form.get('label') as string;

        if (typeof id !== 'string') return fail(400, { error: 'Missing ID' });

        const result = schema.safeParse({ label });
        if (!result.success) {
            console.log("Failed to update tag: ", result);
            return fail(400, { error: 'Invalid input' });
        }

        await db.update(tags).set({ label: label }).where(eq(tags.id, id));

        throw redirect(303, '/dashboard/tags');
    },
    delete: async (event: RequestEvent) => {
        const request = event.request;
        const form = await request.formData();
        const tagId = form.get('id');
        if (typeof tagId !== 'string') return fail(400, { error: 'Missing ID' });

        // Check if tag is linked to any log entries
        const linkedEntries = await db
            .select()
            .from(logTag)
            .where(eq(logTag.tagId, tagId));


        if (linkedEntries.length > 0) {
            return fail(200, {
                tagInUse: true,
                count: linkedEntries.length,
                tagId
            });
        }


        await db.delete(tags).where(eq(tags.id, tagId));
        throw redirect(303, '/dashboard/tags');
    }
} satisfies Actions;