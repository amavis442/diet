import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { tags } from '$lib/server/db/schema/tags';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

const schema = z.object({
    label: z.string().min(1).max(50),
});


export const load: PageServerLoad = async ({ locals,params }) => {
    const availableTags = await db.select().from(tags);
    //console.log(availableLogTypes);
    return {
        availableTags
    };
};

export const actions = {
    delete: async ({ request }) => {
        const form = await request.formData();
        const id = form.get('id');
        if (typeof id !== 'string') return fail(400, { error: 'Missing ID' });

        await db.delete(tags).where(eq(tags.id, id));
        throw redirect(303, '/dashboard/tags');
    }
} satisfies Actions;