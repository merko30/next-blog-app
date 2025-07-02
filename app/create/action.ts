// app/actions/postActions.ts
"use server";

import { z } from "zod";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import authOptions from "@/lib/authOptions";
import prisma from "@/prisma";
import transformFormData from "@/utils/transformFormData";
import { uploadPostImage } from "@/lib/uploadPostImage";

const schema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(100, "Content must be at least 100 characters"),
  categoryId: z.string().min(1, "Please select a category"),
  image: z.any().optional(), // Adjust based on whether image is required
});

export async function createPostAction(prevState: any, formData: FormData) {
  const data = transformFormData(formData, [
    "title",
    "content",
    "categoryId",
    "image",
  ]);

  let imageUrl;

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

  const isImagePresent =
    data.image &&
    typeof data.image === "object" &&
    "size" in data.image &&
    (data.image as File).size > 0;

  if (isImagePresent) {
    imageUrl = await uploadPostImage(
      data.image as File,
      data.title.toString(),
      "posts"
    );
  }

  let error;
  let postId;

  try {
    const post = await prisma.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        categoryId: parseInt(result.data.categoryId),
        image: imageUrl,
        authorId: session.user.id,
      },
    });

    postId = post.id;

    revalidatePath("/");

    return {
      data,
      error: null,
    };
  } catch (err) {
    error = err;
    console.error(err);
    return { error: "Failed to create post", data };
  } finally {
    if (!error) {
      redirect(`/posts/${postId}`);
    }
  }
}
