import { lucia } from "../../auth";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { db, eq, User } from 'astro:db';
import type { APIContext } from "astro";

export async function POST(context: APIContext): Promise<Response> {
	const formData = await context.request.formData();
	const username = formData.get("username");
	// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
	// keep in mind some database (e.g. mysql) are case insensitive
	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return new Response("Invalid username", {
			status: 400
		});
	}
	const password = formData.get("password");
	if (typeof password !== "string" || password.length < 5 || password.length > 255) {
		return new Response("Invalid password", {
			status: 400
		});
	}

    const userExists = (await db.select().from(User).where(eq(User.username, username)))[0];
    if (userExists) {
		return new Response("Username is already taken", {
			status: 400
		});
    }


	const userId = generateId(15);
	const hashedPassword = await new Argon2id().hash(password);
    await db.insert(User).values({ id: userId, username: username, hashed_password: hashedPassword });


	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

	return context.redirect("/account");
}
