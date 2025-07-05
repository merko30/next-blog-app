"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

import Author from "../Author";
import { createCommentAction } from "@/actions/comments";
import { CommentWithAuthor } from "@/types/posts";

const CommentForm = dynamic(() => import("./CommentForm"));

const Comment = ({ comment }: { comment: CommentWithAuthor }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const { data } = useSession();

  return (
    <div className="p-4 border border-gray-300 rounded-sm">
      <Author user={comment.author} size={48} imageClassName="size-12" />
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
