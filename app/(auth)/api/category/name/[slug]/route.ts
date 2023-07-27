import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params }: { params: { slug: string } }) => {
  const category = await prisma.category.findFirst({
    where: {
      category: params.slug,
    },
  });
  return NextResponse.json(category, { status: 201 });
};
