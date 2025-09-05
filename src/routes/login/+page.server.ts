// src/routes/login/+page.server.ts
import { redirect, fail } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';
import { generateSessionToken, setSessionTokenCookie, createSession } from "$lib/server/auth";
import type { User } from '$lib/server/db/schema';
import { validateUser } from '$lib/server/db/user';
import type { Result } from '$lib/types';

const base = import.meta.env.VITE_BASE_URL;
const isProduction = process.env.NODE_ENV === "production";

export const actions: Actions = {
    default: async (event: RequestEvent) => {
        let request = event.request;

        const form = await request.formData();
        const username = form.get('username');
        const password = form.get('password');

        

        if (typeof username !== "string" || typeof password !== "string") {
            return fail(400, {
                message: "Invalid or missing fields",
                username: ""
            });
        }
        if (username === "" || password === "") {
            return fail(400, {
                message: "Please enter your username and password.",
                username
            });
        }

        console.debug(`Url is: ${base}/login`);
        console.debug(`Environment: ${isProduction ? 'Production' : 'Development'}`);

        // Check if username and password have been filled
        const userResult: Result<User> = await validateUser(username, password);
     

        // Check if username and password are in the database and return user id when it is so
        if (!userResult.ok || !userResult.data?.id) {
            console.warn(`Failed login attempt for username: ${username}`);
            return fail(401, { error: userResult.error });
        }
  
        const sessionToken = generateSessionToken();
        const session = await createSession(sessionToken, userResult.data.id);
        setSessionTokenCookie(event, sessionToken, session.expiresAt);

        return redirect(303, '/dashboard/log');
    }
} satisfies Actions;