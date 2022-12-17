import React, { lazy, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import Avatar from "../shared/Avatar";

import useSession from "../hooks/useSession";

const EditComment = lazy(() => import("./EditComment"));

const CommentItem = ({ comment }) => {
  const [isEditModeActive, setIsEditModeActive] = useState(false);

  const { session } = useSession();

  if (isEditModeActive) {
    return (
      <EditComment
        comment={comment}
        onCancel={() => setIsEditModeActive(false)}
      />
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
          className="absolute bottom-0 right-0 py-4 px-4"
          onClick={() => setIsEditModeActive(true)}
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
      )}
      <h2>{comment.comment}</h2>
    </div>
  );
};

export default CommentItem;
