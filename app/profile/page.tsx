import { getServerSession } from "next-auth";

import authOptions from "@/lib/authOptions";

import { Post } from "@/types/posts";
import PostList from "@/components/posts/PostList";
import { API_URL } from "@/lib/env";

async function getData(): Promise<{ posts: Post[] }> {
  const session = await getServerSession(authOptions);

  // filter by user
  const response = await fetch(`${API_URL}/posts?userId=${session?.user!.id}`, {
    headers: { "Content-Type": "application/json" },
  });

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
