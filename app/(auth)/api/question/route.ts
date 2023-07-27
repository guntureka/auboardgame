import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const question = await prisma.question.findMany();
  return NextResponse.json(question, { status: 201 });
};

export const POST = async (request: Request) => {
  const body = await request.json();
  const question = await prisma.question.create({
    data: {
      ...body,
      password: await hash(body.password, 10),
      username: body.username.toLowerCase().replace(" ", ""),
    },
  });

  return NextResponse.json(question, { status: 201 });
};
