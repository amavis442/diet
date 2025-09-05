import type { PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoadEvent, RequestEvent } from "./$types";
import { deleteSessionTokenCookie, invalidateSession } from "$lib/server/auth";

export const load: PageServerLoad = async (event: PageServerLoadEvent) => {
	if (!event.locals.user) {
		throw redirect(302, '/login');
	}

	return redirect(302, '/dashboard');
};

export const actions: Actions = {
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
}