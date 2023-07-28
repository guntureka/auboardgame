import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const player = await prisma.player.findMany({
    include: {
      quiz: true,
    },
  });
  return NextResponse.json(player, { status: 201 });
};

export const POST = async (request: Request) => {
  const body = await request.json();

  const player = await prisma.player.create({
    data: {
      ...body,
    },
  });

  return NextResponse.json(player, { status: 201 });
};
