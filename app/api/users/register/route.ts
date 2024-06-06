import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/prisma";

export const POST = async (req: Request) => {
  const data = await req.json();

  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "Email is already in use" },
      { status: 409 }
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    console.log({ data });

    await prisma.user.create({ data: { ...data, password: hashedPassword } });
    return NextResponse.json(
      { message: "You have been successfully registered" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
};
