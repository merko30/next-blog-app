import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../posts/posts.actions";

export default ({
  match: {
    params: { id }
  }
}) => {
  const dispatch = useDispatch();
  const post = useSelector(({ posts: { post } }) => post);

  useEffect(() => {
    dispatch(getPost(id));
  }, []);

  return <div>{post && <div>{post.title}</div>}</div>;
};
