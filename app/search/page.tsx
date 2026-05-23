"use client";

import { useEffect, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Post, User } from "@prisma/client";

import Input from "@/components/Input";
import PostList from "@/components/posts/PostList";
import Placeholder from "@/components/Placeholder";
import useDebounce from "@/hooks/useDebounce";

type PostWithAuthor = Post & {
  author: Partial<User>;
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      const searchParams = new URLSearchParams();
      searchParams.set("limit", "20");
      if (debouncedQuery.trim()) {
        searchParams.set("q", debouncedQuery.trim());
      }

      try {
        const res = await fetch(`/api/posts?${searchParams.toString()}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("Failed to load posts");
        }

        const json = await res.json();
        if (isMounted) {
          setPosts(json.posts || []);
        }
      } catch (err) {
        if (isMounted && (err as Error).name !== "AbortError") {
          setError((err as Error).message || "Unexpected error");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [debouncedQuery]);

  return (
    <div className="container">
      <div className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              Search posts
            </h1>
            <p className="text-sm text-gray-600">
              Find blog posts by title or content.
            </p>
          </div>
          <div className="w-full sm:w-80">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search posts..."
              type="search"
              aria-label="Search posts"
            />
          </div>
        </div>
      </div>

      {loading && (
        <Placeholder
          icon={MagnifyingGlass}
          title="Loading posts..."
          text="Please wait while we load search results."
        />
      )}

      {error && (
        <Placeholder
          icon={MagnifyingGlass}
          title="Search failed"
          text={error}
          className="text-red-600"
          titleClassName="text-red-600"
        />
      )}

      {!loading && !error && (
        <>
          {posts.length > 0 ? (
            <PostList posts={posts} className="mt-4" columns={3} />
          ) : (
            <Placeholder
              icon={MagnifyingGlass}
              title={
                query.trim()
                  ? "No posts matched your search."
                  : "No posts found."
              }
              text={
                query.trim()
                  ? "Try another keyword or browse all posts later."
                  : "There are no posts to show right now."
              }
            />
          )}
        </>
      )}
    </div>
  );
}
