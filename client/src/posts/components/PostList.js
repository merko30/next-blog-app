import React from "react";

import PostItem from "./PostItem";

const PostList = ({ posts }) => (
  <>
    <div className="posts-container">
      {posts.length > 0 &&
        posts.map((post) => <PostItem post={post} key={post._id} />)}
    </div>
    {posts.length === 0 && (
      <div className="flex flex-col items-center justify-center">
        <img
          src={`${process.env.PUBLIC_URL}/img/empty.svg`}
          alt="no_posts"
          style={{
            width: "300px",
            height: "300px",
          }}
        />
        <h2 className="text-xl">There are no posts, stay tuned.</h2>
      </div>
    )}
  </>
);

export default PostList;
