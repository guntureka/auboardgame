import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const category = await prisma.category.findMany();
  return NextResponse.json(category, { status: 201 });
};

export const POST = async (request: Request) => {
  const body = await request.json();

  const category = await prisma.category.findUnique({
    where: {
      category: body.category.toLowerCase(),
    },
  });

  if (category) {
    return NextResponse.json(
      { message: "Category already exist" },
      { status: 400 },
    );
  }

  const res = await prisma.category.create({
    data: {
      ...body,
      category: body.category.toLowerCase(),
    },
  });

  return NextResponse.json(res, { status: 201 });
};
