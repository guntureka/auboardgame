import { prisma } from "@/lib/prisma";
import { Answer } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params }: { params: { slug: string } }) => {
  const answer = await prisma.answer.findMany({
    where: {
      questionId: params.slug,
    },
    include: {
      question: true,
    },
  });
  return NextResponse.json(answer, { status: 201 });
};
