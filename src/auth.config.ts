import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
// import { LoginSchema } from "../schemes";
import { getUserByEmail } from "./data/getUser";
import { LoginSchema } from "./schemes";
import { ZodError } from "zod";

export default {
  providers: [
    Google,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let db_user = null;

          const validatedFields = LoginSchema.safeParse(credentials);
          console.log("ValidatedFields", validatedFields);
          if (!validatedFields.success) {
            throw new Error("Invalid credentials.");
          }
          const { email, password } = validatedFields.data;

          db_user = await getUserByEmail(email);
          console.log("user", db_user);
          if (!db_user || !db_user?.password) {
            throw new Error("Invalid credentials.");
          }

          console.log("password validated!!!", password);
          const isValid = await bcrypt.compare(
            password,
            db_user?.password || ""
          );
          if (!isValid) {
            throw new Error("Invalid credentials.");
          }

          // return JSON object with the user data
          return db_user as any;
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
