"use client";

import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface AuthorActionsProps {
  author: Partial<User>;
  postId: number;
}

const AuthorActions = ({ author, postId }: AuthorActionsProps) => {
  const { data } = useSession();

  if (data && data?.user?.id === author.id) {
    return <Link href={`/posts/${postId}/edit`}>Edit post</Link>;
  }

  return null;
};

export default AuthorActions;
