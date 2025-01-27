import prisma from "../lib/prisma";

export const getUserByEmail = async (email: string) => {
  try {
    console.log("email", email);
    const user = await prisma.ivy_user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id_: string) => {
  try {
    const id = parseInt(id_);
    const user = await prisma.ivy_user.findUnique({ where: { id } });
    return user;
  } catch (error) {
    return null;
  }
};
