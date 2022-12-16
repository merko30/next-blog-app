import React from "react";
import { useQuery } from "react-query";

import { getPosts } from "../posts/posts.actions";

import PostList from "../posts/components/PostList";

import Error from "../shared/Error";
import Loading from "../shared/Loading";
import Pagination from "../shared/Pagination";

const Home = () => {
  const { error, isLoading, data: queryData } = useQuery("posts", getPosts);

  if (error) {
    return <Error error="Failed to fetch your posts. Try again" />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (queryData) {
    const { data } = queryData;
    return (
      <>
        <PostList posts={data.posts} />
        <Pagination
          numberOfPages={data.numberOfPages}
          onClick={(n) => getPosts(n)}
        />
      </>
    );
  }
  return null;
};

export default Home;
