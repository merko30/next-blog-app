import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PostList from "../components/PostList";

import { getPosts } from "../posts.actions";
import Pagination from "../../shared/Pagination";

export default props => {
  const [calledOnce, setCalledOnce] = useState(false);
  const posts = useSelector(({ posts }) => posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!calledOnce) {
      dispatch(getPosts());
    }
    setCalledOnce(true);
  }, [calledOnce, posts]);

  return (
    <div>
      <PostList posts={posts.posts} />
      <Pagination
        numberOfPages={posts.meta.numberOfPages}
        onClick={n => dispatch(getPosts(n))}
      />
    </div>
  );
};
