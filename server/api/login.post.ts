import { verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { userTable } from "~/drizzle/schema";
import { credentialsSchema } from "~/lib/schema";

export default defineEventHandler(async (event) => {
  const validate = await readValidatedBody(event, (body) =>
    credentialsSchema.safeParse(body)
  );

  if (!validate.success) {
    throw createError({
      message: validate.error.message,
      statusCode: 403,
    });
  }

  const username = validate.data.username;
  const password = validate.data.password;

  const existingUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.username, username))
    .limit(1)
    .get();
  if (!existingUser) {
    throw createError({
      message: "Incorrect username or password",
      statusCode: 400,
    });
  }

  const validPassword = await verify(
    existingUser.passwordHash as string,
    password,
    {
      memoryCost: 19456,
      outputLen: 32,
      timeCost: 2,
      parallelism: 1,
    }
  );
  if (!validPassword) {
    throw createError({
      message: "Incorrect username or password",
      statusCode: 400,
    });
  }

  const session = await lucia.createSession(existingUser.id, { username });
  appendHeader(
    event,
    "Set-Cookie",
    lucia.createSessionCookie(session.id).serialize()
  );
});
