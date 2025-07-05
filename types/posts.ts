import { Comment, Post, User } from "@prisma/client";

export type PostWithAuthor = Post & {
  author: Partial<User>;
};

export type CommentWithAuthor = Comment & { author: Partial<User> };

export type FullPost = PostWithAuthor & { comments: CommentWithAuthor[] };
