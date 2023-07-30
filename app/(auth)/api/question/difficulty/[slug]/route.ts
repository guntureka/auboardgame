import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params }: { params: { slug: string } }) => {
  const question = await prisma.question.findMany({
    where: {
      difficulty: params.slug,
    },
    include: {
        category: true,
        answer: true,
    }
  });
  return NextResponse.json(question, { status: 201 });
};
