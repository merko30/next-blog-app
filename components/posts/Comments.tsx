import { Comment as CommentType } from "@/types/posts";
import Comment from "./Comment";

const Comments = ({ comments = [] }: { comments: CommentType[] }) =>
  comments.map((comment) => <Comment comment={comment} />);

export default Comments;
