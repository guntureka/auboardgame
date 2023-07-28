import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const question = await prisma.question.findMany({
    include: {
      answer: true,
      category: true,
      user: true,
    },
  });
  return NextResponse.json(question, { status: 201 });
};

export const POST = async (request: Request) => {
  const body = await request.json();
  const question = await prisma.question.create({
    data: {
      ...body,
    },
  });

  return NextResponse.json(question, { status: 201 });
};

export const DELETE = async (request: Request, { params }: { params: { slug: string } }) => {
    
}