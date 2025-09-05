import type { Actions, PageServerLoad, RequestEvent } from './$types';
import { db } from '$lib/server/db';
import { tags } from '$lib/server/db/schema/tags';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';

const schema = z.object({
    label: z.string().min(1).max(50),
});

export const load: PageServerLoad = async (event: RequestEvent) => {
    const locals = event.locals;
    if (locals.session === null || locals.user === null) {
        throw redirect(303, '/login');
    }
};


export const actions = {
    create: async ({ request }) => {
        const form = await request.formData();
        const label = form.get('label') as string;
        console.log("Create a new tag", label, form, request);

        const result = schema.safeParse({ label });
        if (!result.success) {
            console.log("Failed to create tag: ", result);
            return fail(400, { error: 'Invalid input' });
        }

        await db.insert(tags).values(result.data);
        throw redirect(303, '/dashboard/tags');
    },
} satisfies Actions;
