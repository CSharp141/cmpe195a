import { db, User } from 'astro:db';
import { Argon2id } from "oslo/password";

const hashedPassword = await new Argon2id().hash('pw123');

export default async function() {
    await db.insert(User).values([
        { id: '1', username: 'user1', hashed_password: hashedPassword },
        { id: '2', username: 'user2', hashed_password: hashedPassword },
        { id: '3', username: 'user3', hashed_password: hashedPassword },
    ])
}
