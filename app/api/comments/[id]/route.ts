import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";

export const PUT = async (req: NextRequest) => {
  const data = await req.json();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  let comment = null;
  if (id) {
    comment = await prisma.comment.update({
      where: {
        id: parseInt(id),
      },
      data,
    });
  }

  return NextResponse.json({ comment });
};
