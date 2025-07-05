"use client";

import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { twMerge } from "tailwind-merge";

import { useActionState } from "react";
import SaveButton from "../users/SaveButton";
import { CommentWithAuthor } from "@/types/posts";

const CommentForm = ({
  action,
  comment,
  className,
  rows = 3,
  textareaClassName,
}: {
  action: (prevState: any, formData: FormData) => Promise<any>;
  comment?: CommentWithAuthor;
  className?: string;
  rows?: number;
  textareaClassName?: string;
}) => {
  const { id } = useParams();

  const initialState = {
    data: {
      content: comment?.text ?? "",
    },
  };

  const [state, formAction] = useActionState(action, initialState);

  const { data } = useSession();

  return (
    <form action={formAction} className={twMerge("flex flex-col", className)}>
      <textarea
        disabled={!data}
        placeholder={data ? "Your comment" : "Please login to comment"}
        name="content"
        defaultValue={state.data.content}
        rows={rows}
        className={twMerge(
          "block w-full mb-4 p-4 border border-gray-200 rounded-sm",
          textareaClassName
        )}
      />
      <input hidden value={id} name="postId" readOnly />
      <SaveButton>Comment</SaveButton>
    </form>
  );
};

export default CommentForm;
