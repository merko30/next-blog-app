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
      <div
        className="m-auto relative"
        style={{
          width: "600px",
          height: "600px"
        }}
      >
        <div className="white-overlay"></div>
        <h1 className="text-5xl text-yellow-500 absolute center-absolute">
          No posts
        </h1>
        <img
          src={`${process.env.PUBLIC_URL}/img/noPosts.svg`}
          alt="no_posts"
          style={{ width: "100%" }}
        />
      </div>
    )}
  </Container>
);

export default PostList;
