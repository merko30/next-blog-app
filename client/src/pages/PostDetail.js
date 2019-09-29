import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CommentList from "../comments/components/CommentList";
import CommentForm from "../comments/components/CommentForm";

import { getPost } from "../posts/posts.actions";
import { addComment } from "../comments/comments.actions";
import Error from "../shared/Error";
import Loading from "../shared/Loading";

const PostDetail = ({
  match: {
    params: { id }
  }
}) => {
  const dispatch = useDispatch();
  const { error, post, loading } = useSelector(({ posts }) => posts);
  const [onceCalled, setOnceCalled] = useState(false);
  const { user, loggedIn } = useSelector(({ auth: { user, loggedIn } }) => ({
    user,
    loggedIn
  }));

  useEffect(() => {
    if (!onceCalled) {
      dispatch(getPost(id));
      setOnceCalled(true);
    }
  }, [user]);

  return (
    <div>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {post && (
        <div className="p-2 px-4 md:px-32 lg:px-64 mx-auto">
          <img
            src={`${process.env.REACT_APP_BASE_URL}/uploads/${post.image}`}
            alt={post.title}
            style={{ width: "100%", objectFit: "cover" }}
          />
          <h1 className="text-2xl font-bold my-2">{post.title}</h1>
          <p className="mt-3">{post.body}</p>
          {loggedIn && user && post && user._id === post.author._id && (
            <Link
              to={`/posts/${post._id}/edit`}
              className="text-blue-600 hover:text-blue:700 mt-4"
            >
              Edit
            </Link>
          )}

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

export default PostDetail;
