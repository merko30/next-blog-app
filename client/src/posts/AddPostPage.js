import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import transformObjectToFormData from "utils/transformObjectToFormData";

import { addPost } from "./posts.actions";

import PostForm from "./PostForm";

const AddPost = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation(
    (values) => {
      const formData = transformObjectToFormData(values);

      addPost(formData);
    },
    {
      onSuccess: () => navigate("/"),
    }
  );

  return <PostForm onSubmit={mutate} />;
};

export default AddPost;
