import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const users = await prisma.user.findMany();
  return NextResponse.json(users, { status: 201 });
};

export const PUT = async (request: Request, { params }: { params: { id: string } }) => {
  const body = await request.json();
  const user = await prisma.user.update({
    where: {
      id: params.id,
    },
    data: {
      ...body,
      password: await hash(body.password, 10),
      username: body.username.toLowerCase().replace(" ", ""),
    },
  });

  return NextResponse.json(user, { status: 201 });
};

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
  const body = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      id: params.id,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  if (body.username && body.username !== user.username) {
    const usernameExists = await prisma.user.findFirst({
      where: {
        username: body.username.toLowerCase().replace(" ", ""),
      },
    });

    if (usernameExists) {
      return NextResponse.json({ message: "Username already exists" }, { status: 400 });
    }

    user.username = body.username.toLowerCase().replace(" ", "");
  }

  if (body.password) {
    user.password = await hash(body.password, 10);
  }

  if (body.role) {
    user.role = body.role;
  }

  const res = await prisma.user.update({
    where: {
      id: params.id,
    },
    data: user,
  });

  return NextResponse.json(res, { status: 201 });
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  const user = await prisma.user.delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json(user, { status: 201 });
};
