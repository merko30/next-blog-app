"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { Comment as CommentType } from "@/types/posts";

import Author from "./Author";
import CommentForm from "./CommentForm";

const Comment = ({ comment }: { comment: CommentType }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const { data } = useSession();

  console.log(data);

  return (
    <div className="p-4 border border-gray-300 rounded-sm">
      <Author author={comment.author} size={48} imageClassName="size-12" />
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
        <CommentForm comment={comment} />
      )}
    </div>
  );
};

export default Comment;
