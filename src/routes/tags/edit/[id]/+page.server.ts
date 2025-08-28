import type { PageServerLoad } from '../$types';
import { db } from '$lib/server/db';
import { tags } from '$lib/server/db/schema/tags';
import type { Actions } from '../$types';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

const schema = z.object({
    label: z.string().min(1).max(50),
});


export const load: PageServerLoad = async ({ params }) => {
    console.log('Params are:', params);
    let id = params.id;

    const logType = await db.select().from(tags).where(eq(tags.id, id));
    return { logType };
};

export const actions = {
    update: async ({ request }) => {
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

        throw redirect(303, '/tags');
    },
    delete: async ({ request }) => {
        const form = await request.formData();
        const id = form.get('id');
        if (typeof id !== 'string') return fail(400, { error: 'Missing ID' });

        await db.delete(tags).where(eq(tags.id, id));
        throw redirect(303, '/tags');
    }
} satisfies Actions;