import React from "react";

import Container from "../../layout/Container";
import PostItem from "./PostItem";

const PostList = ({ posts }) => (
  <Container>
    <div className="posts-container">
      {posts.map(post => (
        <PostItem post={post} key={post._id} />
      ))}
    </div>
  </Container>
);

export default PostList;
