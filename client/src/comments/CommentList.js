import React from "react";

import CommentItem from "./CommentItem";

export default ({ comments }) => {
  return (
    <div className="mt-10">
      {comments &&
        comments.map(comment => (
          <CommentItem comment={comment} key={comment._id} />
        ))}
    </div>
  );
};
