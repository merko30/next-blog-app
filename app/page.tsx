import { SealWarning, NotePencil } from "@phosphor-icons/react/dist/ssr";

import { getEnv } from "@/lib/env";

import Hero from "@/components/Hero";
import PostList from "@/components/posts/PostList";
import Placeholder from "@/components/Placeholder";

async function getData() {
  const res = await fetch(`${getEnv("NEXT_PUBLIC_API_URL")}/posts?limit=5`, {
    next: { revalidate: 100 },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return {
      error: "Failed to fetch posts",
      posts: [],
    };
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  if (data.error) {
    return (
      <Placeholder
        icon={SealWarning}
        title={data.error}
        text="Please try to reload the page"
        className="text-red-600"
      />
    );
  }

  const { posts = [] } = data || {};

  return (
    <>
      <Hero />
      <div className="container">
        <h2 className="text-xl md:text-2xl mb-4">Most recent posts</h2>
        {!!posts?.length && <PostList posts={posts} />}
        {!posts.length && (
          <Placeholder
            icon={NotePencil}
            title="No posts have been created yet. Please check back later."
            className="text-gray-300"
            titleClassName="text-gray-300"
          />
        )}
      </div>
    </>
  );
}
