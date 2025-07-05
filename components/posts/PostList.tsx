import { Post, User } from "@prisma/client";
import PostCard from "./PostCard";

const COLUMN_MAP = {
  5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
};

type PostWithAuthor = Post & {
  author: Partial<User>;
};

interface PostListProps {
  posts: PostWithAuthor[];
  columns?: keyof typeof COLUMN_MAP;
  className?: string;
}

const PostList = ({ posts, columns = 5, className }: PostListProps) => {
  return (
    <div className={`grid ${COLUMN_MAP[columns]} gap-6 ${className}`}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
