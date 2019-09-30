import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CommentList from "../comments/components/CommentList";
import CommentForm from "../comments/components/CommentForm";

import { getPost, likePost } from "../posts/posts.actions";
import { addComment } from "../comments/comments.actions";
import Error from "../shared/Error";
import Loading from "../shared/Loading";
import Like from "../shared/Like";

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
  }, [user, post]);

  return (
    <div>
      {loading && <Loading />}
      {post && (
        <div className="p-2 px-4 md:px-32 lg:px-64 mx-auto relative">
          {error && <Error error={error} />}
          <img
            src={`${process.env.REACT_APP_BASE_URL}/uploads/${post.image}`}
            alt={post.title}
            onError={e =>
              (e.target.src = `${process.env.PUBLIC_URL}/img/defaultImage.svg`)
            }
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
          <Like
            user={user}
            onClick={id => dispatch(likePost(id))}
            post={post}
          />

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
