import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

/* User Actions */

export const getAllUser = async (request: Request) => {
  const body: User = await request.json();
  const user = await prisma.user.findMany();
  return user;
};

export const GetUserById = async ({ id }: { id: string }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
};

export const GetUserByName = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username.toLowerCase(),
    },
  });
  return user;
};

export const createUser = async (data: User) => {
  const user = await prisma.user.create({
    data: {
      ...data,
      username: data.username.toLowerCase().replace(" ", ""),
      password: await hash(data.password, 10),
    },
  });
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
