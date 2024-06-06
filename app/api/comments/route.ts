import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";

export const POST = async (req: NextRequest) => {
  const data = await req.json();

  const comment = await prisma.comment.create({ data });

  return NextResponse.json({ comment });
};
