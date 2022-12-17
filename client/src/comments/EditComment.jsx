import { useMutation } from "react-query";

import CommentForm from "./CommentForm";

import { updateComment } from "./comments.actions";

const EditComment = ({ comment, onCancel }) => {
  const { mutate } = useMutation((data) => updateComment(data));

  console.log(mutate);
  return (
    <CommentForm
      comment={comment}
      onSubmit={(values) => console.log("edit")}
      onCancel={onCancel}
    />
  );
};

export default EditComment;
