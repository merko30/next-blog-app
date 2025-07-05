import { getServerSession } from "next-auth";

import PostList from "@/components/posts/PostList";
import authOptions from "@/lib/authOptions";
import { PostWithAuthor } from "@/types/posts";

async function getData(): Promise<{ posts: PostWithAuthor[] }> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return { posts: [] };
  }

  const posts = await prisma?.post.findMany({
    where: {
      authorId: session.user.id,
    },
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
  });

  return { posts: posts || [] };
}

const ProfilePage = async () => {
  const data = await getData();

  const { posts = [] } = data || {};

  return (
    <>
      <h1 className="text-2xl font-semibold mb-8">My posts</h1>
      {!!posts.length && (
        <PostList posts={posts} columns={3} className="gap-4" />
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
