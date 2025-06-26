import { NextResponse, NextRequest } from "next/server";

import prisma from "@/prisma";
import { uploadImage } from "@/lib/s3client";
import slugify from "@/utils/slugify";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";

export const GET = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;

  const take = parseInt(params.get("limit") ?? "10");
  const page = parseInt(params.get("page") ?? "1");
  const skip = page === 1 ? 0 : page * take;
  const authorId = params.get("userId");

  let where;

  if (authorId) {
    where = {
      authorId,
    };
  }

  const posts = await prisma.post.findMany({
    take,
    skip,
    where,
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
