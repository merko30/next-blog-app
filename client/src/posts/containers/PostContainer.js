import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PostList from "../components/PostList";

import { getPosts } from "../posts.actions";
import Pagination from "../../shared/Pagination";
import Error from "../../shared/Error";
import Loading from "../../shared/Loading";

export default props => {
  const [calledOnce, setCalledOnce] = useState(false);
  const { error, posts, meta, loading } = useSelector(({ posts }) => posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!calledOnce) {
      dispatch(getPosts());
    }
    setCalledOnce(true);
  }, [calledOnce, posts]);

  return (
    <div>
      {error && <Error error={error} />}
      {loading && <Loading />}
      <PostList posts={posts} />
      <Pagination
        numberOfPages={meta.numberOfPages}
        onClick={n => dispatch(getPosts(n))}
      />
    </div>
  );
};
