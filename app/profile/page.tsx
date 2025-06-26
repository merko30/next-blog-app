import { getServerSession } from "next-auth";

import authOptions from "@/lib/authOptions";

import { Post } from "@/types/posts";
import PostList from "@/components/posts/PostList";
import { getEnv } from "@/lib/env";

async function getData(): Promise<{ posts: Post[] }> {
  // filter by user
  const response = await fetch(
    `${getEnv("NEXT_PUBLIC_API_URL")}/posts?mine=true`,
    {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  const json = await response.json();

  return json;
}

const ProfilePage = async () => {
  const data = await getData();

  const { posts = [] } = data || {};

  return (
    <>
      <h1 className="text-2xl font-semibold mb-8">My posts</h1>
      {!!posts.length && (
        <PostList posts={posts} columns={3} className="gap-8" />
      )}
      {!posts.length && (
        <p className="text-2xl font-semibold text-gray-300">
          You have no posts created
        </p>
      )}
    </>
  );
};

export default ProfilePage;
