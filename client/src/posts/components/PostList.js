import React from "react";

import PostItem from "./PostItem";

export default ({ posts }) => (
  <div>
    {posts.map(post => (
      <PostItem post={post} />
    ))}
  </div>
);
