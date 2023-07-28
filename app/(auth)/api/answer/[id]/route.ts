import { prisma } from "@/lib/prisma";
import { Answer } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const answer = await prisma.answer.findMany({
    where: {
      questionId: params.id,
    },
    include: {
      question: true,
    },
  });
  return NextResponse.json(answer, { status: 201 });
};

export const POST = async (request: Request, { params }: { params: { id: string } }) => {
  const body: Answer = await request.json();
  const answer = await prisma.answer.create({
    data: {
      ...body,
    },
  });

  return NextResponse.json(answer, { status: 201 });
};

export const PUT = async (request: Request, { params }: { params: { id: string } }) => {
  const body: Answer = await request.json();
  const answer = await prisma.answer.update({
    where: {
      id: params.id,
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json(answer, { status: 201 });
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  const answer = await prisma.answer.delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json(answer, { status: 201 });
};

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
  const body: Answer = await request.json();
  const answer = await prisma.answer.update({
    where: {
      id: params.id,
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json(answer, { status: 201 });
};
