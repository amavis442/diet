import type { PageServerLoad, RequestEvent } from './$types';
import { db } from '$lib/server/db';
import { logTypes } from '$lib/server/db/schema/log_types';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { deleteSessionTokenCookie, invalidateSession } from "$lib/server/auth";

export const load: PageServerLoad = async ({ locals, cookies, params }) => {
    // for user and if this use still has a valid session
	
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	//Load logTypes
	const availableLogTypes = await db.select().from(logTypes);
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
    },
    logout: async function action(event: RequestEvent) {
		if (event.locals.session === null) {
			return fail(401, {
				message: "Not authenticated"
			});
		}
		invalidateSession(event.locals.session.id);
		deleteSessionTokenCookie(event);
		return redirect(302, "/login");
	}
} satisfies Actions;