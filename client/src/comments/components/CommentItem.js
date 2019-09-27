import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import Avatar from "../../shared/Avatar";
import CommentForm from "./CommentForm";

import { updateComment } from "../comments.actions";

const CommentItem = ({ comment, postID, onEdit }) => {
  const [edit, setEdit] = useState(false);
  const { post, loggedIn, user } = useSelector(
    ({ auth: { user, loggedIn }, posts: { post } }) => ({
      post,
      user,
      loggedIn
    })
  );
  const dispatch = useDispatch();

  return (
    <div>
      {edit ? (
        <CommentForm
          comment={comment}
          editMode={true}
          onSubmit={(postID, id, c) => dispatch(updateComment(postID, id, c))}
          postID={post._id}
          cancelEditMode={() => setEdit(false)}
        />
      ) : (
        <div className="p-3 rounded-lg border border-grey-300 my-3 relative">
          <div className="flex items-center mb-2 border-grey-400 border-b pb-3">
            <Avatar src={comment.author.avatar} alt="author avatar" size={16} />
            <h3 className="font-bold uppercase">
              {comment.author.name || comment.author.username}
            </h3>
          </div>
          {loggedIn && user && comment && user._id === comment.author._id && (
            <button
              className="absolute bottom-0 right-0 py-4 px-4"
              onClick={() => setEdit(true)}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
          )}
          <h2>{comment.comment}</h2>
        </div>
      )}
    </div>
  );
};

export default CommentItem;
