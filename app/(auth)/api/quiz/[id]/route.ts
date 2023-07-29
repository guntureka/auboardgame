import { prisma } from "@/lib/prisma";
import { Quiz } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const quiz = await prisma.quiz.findFirst({
    where: {
      id: params.id,
    },
    include: {
      user: true,
    },
  });
  return NextResponse.json(quiz, { status: 201 });
};

export const PUT = async (request: Request, { params }: { params: { id: string } }) => {
  const body: Quiz = await request.json();
  const quiz = await prisma.quiz.update({
    where: {
      id: params.id,
    },
    data: {
      ...body,
    },
  });
  return NextResponse.json(quiz, { status: 201 });
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  const player = await prisma.player.deleteMany({
    where: {
      quizId: params.id,
    },
  });

  const quiz = await prisma.quiz.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json(quiz, { status: 201 });
};

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
  const body: Quiz = await request.json();
  const quiz = await prisma.quiz.update({
    where: {
      id: params.id,
    },
    data: {
      ...body,
    },
  });
  return NextResponse.json(quiz, { status: 201 });
};
