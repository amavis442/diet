import type { RequestEvent } from './$types';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { deleteSessionTokenCookie, invalidateSession } from "$lib/server/auth";

export const actions = {
    default: async function action(event: RequestEvent) {
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