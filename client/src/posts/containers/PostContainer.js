import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PostList from "../components/PostList";

import { getPosts } from "../posts.actions";

export default props => {
  const posts = useSelector(({ posts: { posts } }) => posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <div>
      <PostList posts={posts} />
    </div>
  );
};
