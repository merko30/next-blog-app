import React from "react";
import { useMutation } from "react-query";

import PostForm from "./PostForm";

import { addPost } from "./posts.actions";

const AddPost = () => {
  const { mutate } = useMutation(addPost);

  return <PostForm onSubmit={mutate} />;
};

export default AddPost;
