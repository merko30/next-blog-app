import React, { lazy, Suspense, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import useSession from "hooks/useSession";

import { deleteComment } from "./comments.actions";

import Avatar from "shared/Avatar";

const EditComment = lazy(() => import("./EditComment"));

const CommentItem = ({ comment }) => {
  const [isEditModeActive, setIsEditModeActive] = useState(false);

  const { session } = useSession();

  const client = useQueryClient();

  const { mutate } = useMutation(() => deleteComment(comment._id), {
    onSuccess: () => {
      client.setQueryData("post", (oldData) => {
        return {
          ...oldData,
          data: {
            ...oldData.data,
            post: {
              ...oldData.data.post,
              comments: oldData.data.post.comments.filter(
                (postComment) => postComment._id !== comment._id
              ),
            },
          },
        };
      });
    },
  });

  if (isEditModeActive) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <EditComment
          comment={comment}
          onCancel={() => setIsEditModeActive(false)}
        />
      </Suspense>
    );
  }

  const isAuthorCurrentUser =
    session &&
    session?.user &&
    comment &&
    session?.user?._id === comment.author._id;

  return (
    <div className="p-3 rounded-lg border border-grey-300 my-3 relative">
      <div className="flex items-center mb-2 border-grey-400 border-b pb-3">
        <Avatar src={comment.author.avatar} alt="author avatar" />
        <h3 className="font-bold uppercase">
          {comment.author.name || comment.author.username}
        </h3>
      </div>
      {isAuthorCurrentUser && (
        <button
          className="absolute bottom-0 right-8 py-3 pr-4"
          onClick={() => setIsEditModeActive(true)}
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
      )}
      {isAuthorCurrentUser && (
        <button
          onClick={mutate}
          className="absolute bottom-0 right-0 py-3 pr-4"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )}

      <h2>{comment.comment}</h2>
    </div>
  );
};

export default CommentItem;
