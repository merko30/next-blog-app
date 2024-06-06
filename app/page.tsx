import PostList from "@/components/posts/PostList";

async function getData() {
  const res = await fetch("http://localhost:3000/api/posts", {
    next: { revalidate: 100 },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <>
      <PostList posts={data.posts} />
    </>
  );
}
