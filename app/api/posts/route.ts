import { NextResponse, NextRequest } from "next/server";

import prisma from "@/prisma";
import { uploadImage } from "@/lib/s3client";
import slugify from "@/utils/slugify";
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

export const POST = async (req: Request) => {
  const formData = await req.formData();

  const title = formData.get("title")?.toString()!;
  const content = formData.get("content")?.toString()!;
  const imageFile = formData.get("image");

  const session = await getServerSession(authOptions);

  const authorId = session?.user?.id;

  if (!title || !content || !authorId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  let image = null;

  const data = { title, content, authorId };

  if (!data || !Object.keys(data).length) {
    return NextResponse.json(
      { error: "Missing required data" },
      { status: 400 }
    );
  }

  if (imageFile) {
    const fileName = await uploadImage(
      imageFile as File,
      slugify(title),
      "posts"
    );
    image = fileName ?? null;
  }

  const post = await prisma.post.create({ data: { ...data, image } });

  return NextResponse.json({ post });
};

export const PUT = async (req: Request) => {
  const data = await req.json();

  if (!data || !Object.keys(data).length || !data.id) {
    return NextResponse.json(
      { error: "Missing required data" },
      { status: 400 }
    );
  }

  const { id, ...rest } = data;

  const post = await prisma.post.update({ where: { id }, data: rest });

  return NextResponse.json({ post });
};
