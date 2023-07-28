import { prisma } from "@/lib/prisma";
import { Answer } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const answer = await prisma.answer.findMany({
    include: {
      question: true,
    },
  });
  return NextResponse.json(answer, { status: 201 });
};

export const POST = async (request: Request) => {
  const body: Answer = await request.json();
  const answer = await prisma.answer.create({
    data: {
      ...body,
    },
  });

  return NextResponse.json(answer, { status: 201 });
};
