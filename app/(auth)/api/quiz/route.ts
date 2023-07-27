import { prisma } from "@/lib/prisma";
import { Quiz } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const quiz = await prisma.quiz.findMany({
    include: {
      user: true,
    }
  });
  return NextResponse.json(quiz, { status: 201 });
};

export const POST = async (request: Request) => {
  const body: Quiz = await request.json();
  const quiz = await prisma.quiz.create({
    data: {
      ...body,
    },
  });
  return NextResponse.json(quiz, { status: 201 });
};
