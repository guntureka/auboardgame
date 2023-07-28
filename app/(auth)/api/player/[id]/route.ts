import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const player = await prisma.player.findMany({
    where: {
      id: params.id,
    },
    include: {
      quiz: true,
    },
  });

  return NextResponse.json(player, { status: 201 });
};

export const PUT = async (request: Request, { params }: { params: { id: string } }) => {
  const body = await request.json();

  const player = await prisma.player.update({
    where: {
      id: params.id,
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json(player, { status: 201 });
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    const player = await prisma.player.delete({
        where: {
        id: params.id,
        },
    });
    
    return NextResponse.json(player, { status: 201 });
}
