import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { logTypes } from '$lib/server/db/schema/log_types';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

const schema = z.object({
    name: z.string().min(1).max(50),
    icon: z.string().min(1),
    color: z.string().min(1),
});


export const load: PageServerLoad = async ({ params }) => {
    console.log('Params are:', params);
    let id = params.id;

    const logType = await db.select().from(logTypes).where(eq(logTypes.id, id));
    return { logType };
};

export const actions = {
    update: async ({ request }) => {
        const form = await request.formData();
        const id = form.get('id') as string;
        const name = form.get('name') as string;
        const icon = form.get('icon') as string;
        const color = form.get('color') as string;

        if (typeof id !== 'string') return fail(400, { error: 'Missing ID' });

        const result = schema.safeParse({ name, icon, color });
        if (!result.success) {
            return fail(400, { error: 'Invalid input' });
        }

        await db.update(logTypes).set({ name: name, icon: icon, color: color }).where(eq(logTypes.id, id));

        throw redirect(303, '/log-types');
    },
    delete: async ({ request }) => {
        const form = await request.formData();
        const id = form.get('id');
        if (typeof id !== 'string') return fail(400, { error: 'Missing ID' });

        await db.delete(logTypes).where(eq(logTypes.id, id));
        throw redirect(303, '/log-types');
    }
} satisfies Actions;