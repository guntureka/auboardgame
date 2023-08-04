import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const category = await prisma.category.findUnique({
    where: {
      id: params.id,
    },
    include: {
      question: true,
    },
  });
  return NextResponse.json(category, { status: 201 });
};

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const body = await request.json();
  const category = await prisma.category.update({
    where: {
      id: params.id,
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json(category, { status: 201 });
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const question = await prisma.question.findMany({
    where: {
      categoryId: params.id,
    },
  });

  question.map(async (item) => {
    await fetch(`${process.env.NEXTAUTH_URL}/api/question/${item.id}`, {
      method: "DELETE",
    });
  });

  const category = await prisma.category.delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json(category, { status: 201 });
};
