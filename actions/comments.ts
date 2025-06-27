"use server";

import { z } from "zod";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import authOptions from "@/lib/authOptions";
import prisma from "@/prisma";
import transformFormData from "@/utils/transformFormData";

const schema = z.object({
  postId: z.string().min(1, "Missing post id"),
  content: z.string().min(3, "Comment must be at least 3 characters"),
});

export async function createCommentAction(prevState: any, formData: FormData) {
  const data = transformFormData(formData, ["postId", "content"]);

  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = Object.entries(
      result.error.flatten().fieldErrors ?? {}
    ).reduce((acc, [key, messages]) => {
      acc[key] = messages[0];
      return acc;
    }, {} as Record<string, string>);

    return { errors, data };
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { error: "Unauthorized", data };
  }

  console.log(session);

  try {
    const comment = await prisma.comment.create({
      data: {
        postId: Number(result.data.postId), // Convert postId to number
        text: result.data.content,
        authorId: session.user.id,
      },
    });

    console.log(comment);

    revalidatePath(`/posts/${result.data.postId}`);

    return {
      data,
      error: null,
    };
  } catch (err) {
    console.log(err);
    return { error: "Failed to create comment", data };
  }
}
