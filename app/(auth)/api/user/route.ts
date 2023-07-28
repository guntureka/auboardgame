import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const users = await prisma.user.findMany({
    include: {
      question: true,
    },
  });
  return NextResponse.json(users, { status: 200 });
};

export const POST = async (request: Request) => {
  const body = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      username: body.username.toLowerCase().replace(" ", ""),
    },
  });

  if (user) {
    return NextResponse.json({ message: "Username already exists" }, { status: 400 });
  }

  const res = await prisma.user.create({
    data: {
      ...body,
      password: await hash(body.password, 10),
      username: body.username.toLowerCase().replace(" ", ""),
    },
  });

  return NextResponse.json(res, { status: 201 });
};
