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
import Image from "../shared/Image";
import Author from "../shared/Author";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const PostDetail = ({
  location: {
    state: { id }
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
    if (post) {
      document.title = `${post.title} | Merko's blog`;
    }
  }, [user, post]);

  return (
    <div>
      {loading && <Loading />}
      {post && (
        <div className="p-2 px-4 md:px-32 lg:px-64 mx-auto relative">
          {error && <Error error={error} />}
          <Author author={post.author} createdAt={post.createdAt} />
          <Image src={post.image} height="100%" alt={post.title} />
          <div className="relative">
            <h1 className="text-2xl font-bold my-2 mr-10">{post.title}</h1>
            <p className="mt-3 break-all">{post.body}</p>
            {loggedIn && user && post && user._id === post.author._id && (
              <Link
                to={`/posts/${post._id}/edit`}
                className="block absolute top-0 right-0 m-2"
              >
                <FontAwesomeIcon icon={faPencilAlt} />
              </Link>
            )}
          </div>
          <Like
            user={user}
            onClick={id => dispatch(likePost(id))}
            record={post}
            recordName="post"
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
