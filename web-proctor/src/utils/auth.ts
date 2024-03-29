import { db, User, eq } from 'astro:db';

export async function validateUser(username: string, password: string) {
    const user = (await db.select().from(User).where(eq(User.username, username)))[0];
    if (!user) {
        return false;
    }
    // hash maybe lol
    return user.password === password;
}
