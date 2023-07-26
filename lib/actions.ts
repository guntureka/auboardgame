import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

/* User Actions */

export const getAllUser = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  return user;
};

export const createUser = async (data: User) => {
  const user = await prisma.user.create({ data });
  return user;
};

export const updateUser = async (id: string, data: User) => {
  const user = await prisma.user.update({ where: { id }, data });
  return user;
};

export const deleteUser = async (id: string) => {
  const user = await prisma.user.delete({ where: { id } });
  return user;
};

export const deleteAllUser = async () => {
  const users = await prisma.user.deleteMany();
  return users;
};
