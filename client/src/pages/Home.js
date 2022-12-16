import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../posts/posts.actions";

import PostList from "../posts/components/PostList";

import Error from "../shared/Error";
import Loading from "../shared/Loading";
import Pagination from "../shared/Pagination";

const Home = () => {
  const { posts, loading, error, meta } = useSelector(({ posts }) => posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <>
      {error && <Error error={error} />}
      {loading && <Loading />}
      <PostList posts={posts} />
      <Pagination
        numberOfPages={meta.numberOfPages}
        onClick={(n) => dispatch(getPosts(n))}
      />
    </>
  );
};

export default Home;
