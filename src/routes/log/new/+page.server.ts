import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { logTypes } from '$lib/server/db/schema/log_types';
import { tags } from '$lib/server/db/schema/tags';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

const schema = z.object({
    name: z.string().min(1).max(50),
    icon: z.string().min(1),
});

export async function load() {
    const types = await db.select().from(logTypes);
    const logTags = await db.select().from(tags);
    return { types, logTags };
}

export const actions = {
    create: async ({ request }) => {
        const form = await request.formData();
        const name = form.get('name');
        const icon = form.get('icon');

        console.log("Create a new log entry", name, icon, form, request);

        const result = schema.safeParse({ name, icon });
        if (!result.success) {
            return fail(400, { error: 'Invalid input' });
        }

        await db.insert(logTypes).values(result.data);
        throw redirect(303, '/log-types');
    },
    update: async ({ request }) => {
        const form = await request.formData();
        const id = form.get('id') as string;
        const name = form.get('name') as string;
        const icon = form.get('icon') as string;
        if (typeof id !== 'string') return fail(400, { error: 'Missing ID' });

        await db.update(logTypes).set({ name: name, icon: icon }).where(eq(logTypes.id, id));
    },
    delete: async ({ request }) => {
        const form = await request.formData();
        const id = form.get('id');
        if (typeof id !== 'string') return fail(400, { error: 'Missing ID' });

        await db.delete(logTypes).where(eq(logTypes.id, id));
        throw redirect(303, '/log-types');
    }
}satisfies Actions;
