import CommentItem from "./CommentItem";

const CommentList = ({ comments }) => {
  return (
    <div className="mt-10">
      {comments &&
        comments.map((comment) => (
          <CommentItem comment={comment} key={comment._id} />
        ))}
    </div>
  );
};

export default CommentList;
