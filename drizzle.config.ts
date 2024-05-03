import type { Config } from "drizzle-kit";
export default {
  schema: "./drizzle/schema/index.ts",
  out: "./drizzle/migrations",
  driver: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
  },
} satisfies Config;
