import React from "react";

import Container from "../../layout/Container";
import PostItem from "./PostItem";

export default ({ posts }) => (
  <Container>
    <div className="posts-container">
      {posts.map(post => (
        <PostItem post={post} key={post._id} />
      ))}
    </div>
  </Container>
);
