import { db, User } from 'astro:db';

export default async function() {
    await db.insert(User).values([
        { id: 1, username: 'user1', password: 'pass1' },
        { id: 2, username: 'user2', password: 'pass2' },
        { id: 3, username: 'user3', password: 'pass3' },
    ])
}
