import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { hashPassword, verifyPasswordHash } from '$lib/server/password';
import type { User } from '$lib/server/db/schema';
import { user } from '$lib/server/db/schema';
import type { Result } from '$lib/types';

const schema = z.object({
    username: z.string().min(1).max(50),
    passwordHash: z.string().min(1)
});

/**
 * Creates a new user in the database with a hashed password.
 *
 * @param username - The username to register (1–50 characters).
 * @param password - The raw password to be hashed and stored.
 * @returns A `User` object representing the newly created user.
 * @throws If input validation fails or the database insert fails.
 */
export async function createUser(username: string, password: string): Promise<Result<User>> {
    const newPassword: string = await hashPassword(password);

    const result = schema.safeParse({ username: username, passwordHash: newPassword });
    if (!result.success) {
        return { ok: false, error: 'Invalid input' };
    }

    const insertUser: User[] = await db.insert(user).values(result.data).returning();

    if (!insertUser || insertUser.length === 0) {
        return { ok: false, error: 'Could not register' };
    }
    return { ok: true, data: insertUser[0] };
}

/**
 * Validates a user's credentials by checking the username and verifying the password hash.
 *
 * @param username - The username to look up.
 * @param password - The raw password to verify against the stored hash.
 * @returns An object with:
 *   - `ok`: Whether the credentials are valid.
 *   - `error`: A message describing the failure (empty if successful).
 *   - `user`: The matched `User` object if validation succeeds.
 */
export async function validateUser(username: string, password: string): Promise<Result<User>> {
    // Get user data 
    const userData: User[] = await db
        .select()
        .from(user)
        .where(eq(user.username, username));

    // Check if username and password are in the database and return user id when it is so
    if (!userData?.[0] || !(await verifyPasswordHash(userData[0].passwordHash, password))) {
        return { ok: false, error: 'Invalid credentials' };
    }

    return { ok: true, error: '', data: userData[0] };
}

/**
 * Retrieves the hashed password for a given user ID.
 *
 * @param userid - The UUID of the user.
 * @returns The stored password hash as a string.
 * @throws If the user ID is invalid or not found.
 */
export async function getUserPasswordHash(userid: string): Promise<string> {

    // Get user data 
    const userData: User[] = await db
        .select()
        .from(user)
        .where(eq(user.id, userid));

    // Check if username and password are in the database and return user id when it is so
    if (!userData || userData.length === 0) {
        throw new Error("Invalid user ID");
    }

    return userData[0].passwordHash;
}