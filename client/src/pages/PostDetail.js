import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CommentList from "../comments/components/CommentList";
import CommentForm from "../comments/components/CommentForm";

import { getPost } from "../posts/posts.actions";
import { addComment } from "../comments/comments.actions";

export default ({
  match: {
    params: { id }
  }
}) => {
  const dispatch = useDispatch();
  const post = useSelector(({ posts: { post } }) => post);

  useEffect(() => {
    dispatch(getPost(id));
  }, []);

  return (
    <div>
      {post && (
        <div className="p-2 py-4 md:px-32 lg:px-40 mx-auto lg:py-12">
          <img
            src="http://res.publicdomainfiles.com/pdf_view/185/14006695215558.jpg"
            alt={post.title}
          />
          <h1 className="text-2xl font-bold my-2">{post.title}</h1>
          <p className="mt-3">{post.body}</p>
          <Link
            to={`/posts/${post._id}/edit`}
            className="text-blue-600 hover:text-blue:700"
          >
            Edit
          </Link>

          <CommentList comments={post.comments} />
          <CommentForm
            editMode={false}
            postID={post._id}
            onSubmit={(id, comment) => dispatch(addComment(id, comment))}
          />
        </div>
      )}
    </div>
  );
};
