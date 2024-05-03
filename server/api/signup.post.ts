import { hash } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
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

  const passwordHash = await hash(password, {
    // recommended minimum parameters
    memoryCost: 19456,
    outputLen: 32,
    timeCost: 2,
    parallelism: 1,
  });
  const userId = generateIdFromEntropySize(10); // 16 characters long

  // TODO: check if username is already used
  const isUserExist = await db
    .select()
    .from(userTable)
    .where(eq(userTable.username, username))
    .limit(1)
    .get();

  if (isUserExist) {
    throw createError({
      message: "User Already Exist",
      statusCode: 400,
    });
  }

  if (!isUserExist) {
    await db.insert(userTable).values({
      id: userId,
      username: username,
      passwordHash: passwordHash,
    });
  }

  const session = await lucia.createSession(userId, { username });
  appendHeader(
    event,
    "Set-Cookie",
    lucia.createSessionCookie(session.id).serialize()
  );
});
