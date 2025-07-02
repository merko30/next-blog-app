import { NextResponse, NextRequest } from "next/server";

import prisma from "@/prisma";
// import slugify from "@/utils/slugify";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";

const isPostField = (
  field: string
): field is keyof typeof prisma.post.fields => {
  return field in prisma.post.fields;
};

const parseOrderByParam = (
  param: string | null
): {
  field: string;
  direction: "asc" | "desc";
} => {
  const defaultField = "createdAt";
  const defaultDirection: "asc" | "desc" = "asc";

  if (!param) return { field: defaultField, direction: defaultDirection };

  const [field, dir] = param.includes("_") ? param.split("_") : [param, "asc"];
  const direction = dir?.toLowerCase() === "desc" ? "desc" : "asc";

  return isPostField(field)
    ? { field, direction }
    : { field: defaultField, direction: defaultDirection };
};

export const GET = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;

  const take = parseInt(params.get("limit") ?? "10");
  const page = parseInt(params.get("page") ?? "1");
  const skip = (page - 1) * take;
  const loadUserPosts = params.get("mine") === "true";

  const { field: orderBy, direction: orderByDirection } = parseOrderByParam(
    params.get("orderBy")
  );

  let where;

  if (loadUserPosts) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized", debug: { session } },
        { status: 401 }
      );
    }

    where = {
      authorId: session.user.id,
    };
  }

  const posts = await prisma.post.findMany({
    take,
    skip,
    where,
    orderBy: { [orderBy!]: orderByDirection },
    include: {
      author: true,
    },
  });

  return NextResponse.json({ posts });
};
