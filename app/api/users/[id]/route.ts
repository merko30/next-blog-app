import { NextResponse } from "next/server";

import prisma from "@/prisma";

export const GET = async (req: Request, props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const userFromDb = await prisma.user.findUnique({
    where: { id: params.id },
  });
  if (userFromDb) {
    const { password, ...user } = userFromDb;

    return NextResponse.json({ user }, { status: 200 });
  }
  return NextResponse.json({ error: "Not found" }, { status: 404 });
};

export const PUT = async (req: Request, props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const data = await req.json();

  const userFromDb = await prisma.user.update({
    where: { id: params.id },
    data,
  });

  if (userFromDb) {
    const { password, ...user } = userFromDb;

    return NextResponse.json({ user }, { status: 200 });
  }
  return NextResponse.json({ error: "Not found" }, { status: 404 });
};
