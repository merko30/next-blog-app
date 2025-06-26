import { NextResponse } from "next/server";

import prisma from "@/prisma";

export const GET = async (req: Request, props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const post = await prisma.post.findUnique({
    where: { id: Number(params.id) },
    include: {
      author: true,
      comments: {
        include: {
          author: true,
        },
      },
    },
  });

  return NextResponse.json({ post }, { status: 200 });
};

export const PUT = async (req: Request, props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const post = await prisma.post.findUnique({
    where: { id: Number(params.id) },
  });

  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  const formData = await req.formData();
  let data = {} as any;

  for (const [key, value] of formData) {
    data[key] = value;
  }

  const updatedPost = await prisma.post.update({
    where: {
      id: Number(params.id),
    },
    data,
    include: { author: true },
  });

  return NextResponse.json({ post: updatedPost }, { status: 200 });
};
