import { NextRequest, NextResponse } from "next/server";

import prisma from "@/prisma";

export const GET = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;

  const term = params.get("term");
  const limit = Math.min(parseInt(params.get("limit") ?? "10"), 100);
  const orderBy = params.get("orderBy") ?? "name";

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
    take: limit,
    orderBy:
      orderBy === "postCount" ? { posts: { _count: "desc" } } : { name: "asc" },
  });

  return NextResponse.json({ categories });
};
