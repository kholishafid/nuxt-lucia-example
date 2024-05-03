import { z } from "zod";

export const credentialsSchema = z.object({
  username: z
    .string({
      required_error: "Username is Required.",
      invalid_type_error: "Username must be a string.",
    })
    .min(3, { message: "Must be 3 or more characters long" })
    .max(31, { message: "Must be 31 or fewer characters long" })
    .regex(
      /^[A-Za-z0-9_-]+$/,
      "Username must be characters, underscores, or hyphens only!"
    ),
  password: z
    .string({
      required_error: "Password is Required.",
    })
    .min(6, { message: "Must be 6 or more characters long" }),
});
