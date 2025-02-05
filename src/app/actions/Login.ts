"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import * as z from "zod";
import { LoginSchema } from "../../schemes";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const LoginAction = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    // return { error: validatedFields.error };
    return {
      error: "Invalid fields",
    };
  }

  const { email, password } = validatedFields.data;
  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    if (res) {
      return { success: "Logged in successfully" };
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials",
          };
        default:
          return {
            error: "Something went wrong",
          };
      }
    }
    throw error;
  }
};
