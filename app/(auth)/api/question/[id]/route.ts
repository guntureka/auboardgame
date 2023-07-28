import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const question = await prisma.question.findFirst({
    where: {
      id: params.id,
    },
    include: {
      answer: true,
      category: true,
      user: true,
    },
  });
  return NextResponse.json(question, { status: 201 });
};

export const PUT = async (request: Request, { params }: { params: { id: string } }) => {
  const body = await request.json();
  const question = await prisma.question.update({
    where: {
      id: params.id,
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json(question, { status: 201 });
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  const answer = await prisma.answer.deleteMany({
    where: {
      questionId: params.id,
    },
  });
  
  const question = await prisma.question.delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json(question, { status: 201 });
};
export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
  const body = await request.json();
  const question = await prisma.question.update({
    where: {
      id: params.id,
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json(question, { status: 201 });
};
