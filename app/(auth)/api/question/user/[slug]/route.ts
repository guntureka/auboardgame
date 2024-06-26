import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { slug: string } },
) => {
  const question = await prisma.question.findMany({
    where: {
      userId: params.slug,
    },
    include: {
      answer: true,
      category: true,
      user: true,
    },
  });
  return NextResponse.json(question, { status: 201 });
};
