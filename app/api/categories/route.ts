import { NextRequest, NextResponse } from "next/server";

import prisma from "@/prisma";

export const GET = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;

  const term = params.get("term");

  const categories = await prisma.category.findMany({
    ...(term
      ? {
          where: {
            name: {
              contains: term,
              mode: "insensitive",
            },
          },
        }
      : {}),
    take: 10,
  });

  return NextResponse.json({ categories });
};
