import { NextResponse } from "next/server";

import prisma from "@/prisma";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
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

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(params.id) },
  });

  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  const data = await req.json();

  const updatedPost = await prisma.post.update({
    where: {
      id: Number(params.id),
    },
    data,
    include: { author: true },
  });

  return NextResponse.json({ post: updatedPost }, { status: 200 });
};
