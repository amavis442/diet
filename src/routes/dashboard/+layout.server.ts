import type { RequestEvent, Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export async function load(event:RequestEvent) {
    const locals = event.locals;
    if (locals.user === null || locals.session === null) {
        throw redirect(303, '/login');
    }

    return {
        user: locals.user
    };
}
