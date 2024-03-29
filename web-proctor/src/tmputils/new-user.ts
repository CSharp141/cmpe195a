import { db, User, eq } from 'astro:db';

export async function isUnique(username: string) {
    const userExists = (await db.select().from(User).where(eq(User.username, username)))[0];
    if (userExists) {
        return false;
    }
    // hash maybe lol
    return !userExists;
}
