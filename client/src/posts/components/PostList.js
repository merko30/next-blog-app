import React from "react";

import Container from "../../layout/Container";
import PostItem from "./PostItem";

const PostList = ({ posts }) => (
  <Container>
    <div className="posts-container">
      {posts.length > 0 &&
        posts.map(post => <PostItem post={post} key={post._id} />)}
    </div>
    {posts.length === 0 && (
      <div className="flex items-center justify-center">
        <img
          src={`${process.env.PUBLIC_URL}/img/empty.svg`}
          alt="no_posts"
          style={{
            width: "600px",
            height: "600px"
          }}
        />
      </div>
    )}
  </Container>
);

export default PostList;
