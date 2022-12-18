import { useMutation, useQueryClient } from "react-query";

import CommentForm from "./CommentForm";

import { updateComment } from "./comments.actions";

const EditComment = ({ comment, onCancel }) => {
  const client = useQueryClient();

  const { mutate } = useMutation((data) => updateComment(comment._id, data), {
    onSuccess: (data) => {
      client.setQueryData("post", (oldData) => {
        return {
          ...oldData,
          data: {
            ...oldData.data,
            post: {
              ...oldData.data.post,
              comments: oldData.data.post.comments.map((postComment) => {
                if (postComment._id === comment._id) {
                  return {
                    ...postComment,
                    ...data.data.comment,
                  };
                }
                return postComment;
              }),
            },
          },
        };
      });

      onCancel();
    },
  });

  return (
    <CommentForm comment={comment} onSubmit={mutate} onCancel={onCancel} />
  );
};

export default EditComment;
