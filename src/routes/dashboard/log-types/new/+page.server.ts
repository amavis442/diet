import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { logTypes } from '$lib/server/db/schema/log_types';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';

const schema = z.object({
    name: z.string().min(1).max(50),
    icon: z.string().min(1),
    color: z.string().min(1),
});

export const actions = {
    create: async ({ request }) => {
        const form = await request.formData();
        const name = form.get('name') as string;
        const icon = form.get('icon') as string;
        const color = form.get('color') as string;

        console.log("Create a new log entry", name, icon, form, request);

        const result = schema.safeParse({ name, icon, color });
        if (!result.success) {
            return fail(400, { error: 'Invalid input' });
        }

        await db.insert(logTypes).values(result.data);
        throw redirect(303, '/dashboard/log-types');
    },
} satisfies Actions;
