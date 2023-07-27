import { prisma } from "@/lib/prisma";
import { Quiz } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const quiz = await prisma.quiz.findMany({
    where: {
      id: params.id,
    },
    include: {
      user: true,
    },
  });
  return NextResponse.json(quiz, { status: 201 });
};
