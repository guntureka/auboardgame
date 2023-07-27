import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const users = await prisma.user.findMany();
  return NextResponse.json(users, { status: 201 });
};

export const POST = async (request: Request) => {
  const body = await request.json();
  const user = await prisma.user.create({
    data: {
      ...body,
      password: await hash(body.password, 10),
      username: body.username.toLowerCase().replace(" ", ""),
    },
  });

  return NextResponse.json(user, { status: 201 });
};
