"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
import dynamic from "next/dynamic";

import { Comment as CommentType } from "@/types/posts";

import Author from "../Author";
import { createCommentAction } from "@/actions/comments";

const CommentForm = dynamic(() => import("./CommentForm"));

const Comment = ({ comment }: { comment: CommentType }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const { data } = useSession();

  return (
    <div className="p-4 border border-gray-300 rounded-sm">
      <Author
        user={comment.author as User}
        size={48}
        imageClassName="size-12"
      />
      <hr className="my-2" />
      {!isEditMode ? (
        <div className="flex justify-between w-full">
          <p className="font-medium">{comment.text}</p>
          {data && data?.user?.id === comment.author.id && (
            <span role="button" onClick={() => setIsEditMode(true)}>
              Edit
            </span>
          )}
        </div>
      ) : (
        <CommentForm comment={comment} action={createCommentAction} />
      )}
    </div>
  );
};

export default Comment;
