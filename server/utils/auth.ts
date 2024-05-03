import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia, TimeSpan } from "lucia";
import { db } from "./db";
import { sessionTable, userTable } from "~/drizzle/schema";

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !process.dev,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
    };
  },
  getSessionAttributes: (attributes) => {
    return {
      username: attributes.username,
    };
  },
  sessionExpiresIn: new TimeSpan(1, "d"),
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
    DatabaseSessionAttributes: DatabaseSessionAttributes;
  }
}

interface DatabaseUserAttributes {
  username: string;
}

interface DatabaseSessionAttributes {
  username: string;
}
