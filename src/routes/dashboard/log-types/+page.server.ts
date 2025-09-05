import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { logTypes } from '$lib/server/db/schema/log_types';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals, params }) => {
    const availableLogTypes = await db.select().from(logTypes);
    //console.log(availableLogTypes);
    return {
        availableLogTypes
    };
};

export const actions = {
    delete: async ({ request }) => {
        const form = await request.formData();
        const id = form.get('id');
        if (typeof id !== 'string') return fail(400, { error: 'Missing ID' });

        await db.delete(logTypes).where(eq(logTypes.id, id));
        throw redirect(303, '/dashboard/log-types');
    }
} satisfies Actions;