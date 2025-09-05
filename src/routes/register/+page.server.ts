// src/routes/register/+page.server.ts
import { redirect, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { verifyPasswordStrength } from "$lib/server/password";
import { createUser } from '$lib/server/db/user';

const base = import.meta.env.VITE_BASE_URL;
const isProduction = process.env.NODE_ENV === "production";


export const actions: Actions = {
    default: async ({ request, fetch }) => {
        const form = await request.formData();
        const username = form.get('username');
        const password = form.get('password');
        const repeatPassword = form.get('repeat_password');

        console.log(`Url is: ${base}/auth/register`);
        if (isProduction) {
            console.log("Running in prod mode");
        } else {
            console.log("Running in dev mode");
        }

        if (typeof username !== "string" || typeof password !== "string" || typeof repeatPassword !== "string") {
            return fail(400, {
                message: "Invalid or missing fields",
                username: ""
            });
        }
        if (username === "" || password === "" || repeatPassword === "") {
            return fail(400, {
                message: "Please enter your username and password.",
                username
            });
        }

        const strongPassword = await verifyPasswordStrength(password);
        if (!strongPassword) {
            return fail(400, {
                message: "Weak password",
                username
            });
        }

        if (password != repeatPassword) {
            return fail(400, {
                message: "Passwords do not match.",
                username
            });
        }

        const result = await createUser(username, password);
        if (!result.ok || !result.data?.id) {
            return fail(400, { message: result.error });
        }
        console.debug("User registered:", result.data);

        return redirect(303, '/login');
    }

} satisfies Actions;