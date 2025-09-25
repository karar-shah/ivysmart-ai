"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "../../schemes";
import { getUserByEmail } from "../../data/getUser";
import prisma from "../../lib/prisma";

export const RegisterAction = async (
  values: z.infer<typeof RegisterSchema>
) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    // return { error: validatedFields.error };
    return {
      error: "Invalid fields",
    };
  }
  const { email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    // return { error: "User already exists" };
    return {
      error: "User already exists",
    };
  }

  const user = await prisma.ivy_user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  // console.log("User created:", user);
  // SEND VERIFICATION TOkEN TO EMAIL
  return {
    success: "User Registered Successfully",
  };
};
