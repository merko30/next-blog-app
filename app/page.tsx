import PostList from "@/components/posts/PostList";
import { API_URL } from "@/lib/env";
import { SealWarning } from "@phosphor-icons/react/dist/ssr";

async function getData() {
  const res = await fetch(`${API_URL}/posts`, {
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
      <div className="flex flex-col items-center justify-center sm:py-12 md:py-24 text-red-600">
        <SealWarning size={120} />
        <h1 className="text-2xl mt-4 text-black">{data.error}</h1>
        <p className="text-gray-700 text-sm">Please try to reload the page.</p>
      </div>
    );
  }

  return (
    <>
      <PostList posts={data.posts} />
    </>
  );
}
