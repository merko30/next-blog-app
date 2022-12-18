import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import transformObjectToFormData from "utils/transformObjectToFormData";

import { getPost, updatePost } from "./posts.actions";

import Error from "shared/Error";
import Loading from "shared/Loading";

import PostForm from "./PostForm";

const EditPostPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    data: queryData,
    isLoading,
    error,
  } = useQuery("post", () => getPost(id));

  const { mutate } = useMutation(
    (values) => {
      const formData = transformObjectToFormData(values);

      updatePost(formData);
    },
    {
      onSuccess: () => navigate("/"),
    }
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error error="Failed to load the post. Try reloading" />;
  }

  if (queryData) {
    const {
      data: { post },
    } = queryData;
    return <PostForm post={post} onSubmit={mutate} />;
  }
};

export default EditPostPage;
