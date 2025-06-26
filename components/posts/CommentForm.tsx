"use client";

import { SyntheticEvent, useState } from "react";
import { useParams } from "next/navigation";
// import { revalidatePath } from "next/cache";
import { useSession } from "next-auth/react";
import { twMerge } from "tailwind-merge";

import { Comment } from "@/types/posts";

import Button from "../Button";

import { getEnv } from "@/lib/env";

const CommentForm = ({
  comment: _comment,
  className,
  rows = 3,
  textareaClassName,
}: {
  comment?: Comment;
  className?: string;
  rows?: number;
  textareaClassName?: string;
}) => {
  const { id } = useParams();

  const { data } = useSession();

  const [comment, setComment] = useState(_comment?.text ?? "");
  const [loading, setLoading] = useState(false);

  const createComment = async (comment: string) => {
    const url = _comment
      ? `${getEnv("NEXT_PUBLIC_API_URL")}/comments/${_comment!.id}`
      : `${getEnv("NEXT_PUBLIC_API_URL")}/comments`;

    console.log({ url });

    try {
      const response = await fetch(url, {
        method: _comment ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: comment,
          ...(!_comment
            ? {
                postId: parseInt(id as string),
                authorId: data?.user?.id,
              }
            : {}),
        }),
      });

      const json = await response.json();

      // revalidatePath(`/posts/${id}`, "page");
    } catch (error) {
      return { error: "Something went wrong" };
    }
  };

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    await createComment(comment);
    setLoading(false);
  };

  return (
    <form onSubmit={onSubmit} className={twMerge("flex flex-col", className)}>
      <textarea
        value={comment}
        disabled={!data}
        placeholder={data ? "Your comment" : "Please login to comment"}
        onChange={(e) => setComment(e.target.value)}
        name="comment"
        rows={rows}
        className={twMerge(
          "block w-full mb-4 p-4 border border-gray-200 rounded-sm",
          textareaClassName
        )}
      />
      <Button className="ml-auto self-end">
        {loading ? "..." : "Comment"}
      </Button>
    </form>
  );
};

export default CommentForm;
