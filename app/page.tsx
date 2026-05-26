import {
  SealWarningIcon,
  NotePencilIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { getEnv } from "@/lib/env";

import Hero from "@/components/Hero";
import PostList from "@/components/posts/PostList";
import Placeholder from "@/components/Placeholder";
import Categories from "@/components/Categories";

async function getData() {
  const [postsRes, categoriesRes] = await Promise.all([
    fetch(`${getEnv("NEXT_PUBLIC_API_URL")}/posts?limit=5`, {
      next: { revalidate: 100 },
    }),
    fetch(
      `${getEnv("NEXT_PUBLIC_API_URL")}/categories?limit=3&orderBy=postCount`,
      {
        next: { revalidate: 100 },
      },
    ),
  ]);

  if (!postsRes.ok) {
    return {
      error: "Failed to fetch posts",
      posts: [],
      categories: [],
    };
  }

  const postsData = await postsRes.json();
  const categoriesData = categoriesRes.ok
    ? await categoriesRes.json()
    : { categories: [] };

  return {
    posts: postsData.posts || [],
    categories: categoriesData.categories || [],
  };
}

export default async function Home() {
  const data = await getData();

  if (data.error) {
    return (
      <Placeholder
        icon={SealWarningIcon}
        title={data.error}
        text="Please try to reload the page"
        className="text-red-600"
      />
    );
  }

  const { posts = [], categories = [] } = data || {};

  return (
    <>
      <Hero />
      <div className="container">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl">Most recent posts</h2>
          <Link
            href="/search"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            See all posts
          </Link>
        </div>
        {!!posts?.length && <PostList posts={posts} />}
        {!posts.length && (
          <Placeholder
            icon={NotePencilIcon}
            title="No posts have been created yet. Please check back later."
            className="text-gray-300"
            titleClassName="text-gray-300"
          />
        )}
        <h2 className="text-xl md:text-2xl mt-10">Popular categories</h2>
        <div className="w-full py-10">
          <Categories categories={categories} />
        </div>
      </div>
    </>
  );
}
