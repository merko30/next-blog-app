import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostForm from "../posts/components/PostForm";
import { addPost, updatePost } from "../posts/posts.actions";

export default ({ editMode }) => {
  const post = useSelector(({ posts: { post } }) => post);
  const dispatch = useDispatch();

  if (editMode) {
    return (
      <PostForm
        onSubmit={(id, post) => dispatch(updatePost(id, post))}
        post={post}
        editMode={editMode}
      />
    );
  } else {
    return <PostForm onSubmit={p => dispatch(addPost(p))} editMode={false} />;
  }
};
