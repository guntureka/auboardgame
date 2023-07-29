import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params }: { params: { slug: string } }) => {
  const player = await prisma.player.findMany({
    where: {
      quizId: params.slug,
    },
    include: {
      quiz: true,
    },
  });

  if (!player) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(player, { status: 200 });
};
