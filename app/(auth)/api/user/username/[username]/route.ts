import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { username: string } },
) => {
  const users = await prisma.user.findFirst({
    where: {
      username: params.username.toLowerCase().replace(" ", ""),
    },
  });
  return NextResponse.json(users, { status: 200 });
};
