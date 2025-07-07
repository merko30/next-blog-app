import { CommentWithAuthor } from "@/types/posts";

import Comment from "./Comment";

const Comments = ({ comments = [] }: { comments: CommentWithAuthor[] }) =>
  comments.map((comment) => <Comment comment={comment} />);

export default Comments;
