"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { List, MagnifyingGlass, SquaresFour } from "@phosphor-icons/react";
import { Post, User } from "@prisma/client";

import Input from "@/components/Input";
import InlinePostCard from "@/components/posts/InlinePostCard";
import Placeholder from "@/components/Placeholder";
import useDebounce from "@/hooks/useDebounce";

const LazyPostCard = dynamic(() => import("@/components/posts/PostCard"), {
  ssr: false,
  loading: () => (
    <div className="h-72 animate-pulse rounded-sm border border-gray-200 bg-gray-100" />
  ),
});

type PostWithAuthor = Post & {
  author: Partial<User>;
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"inline" | "card">("inline");

  useEffect(() => {
    const updateViewMode = () => {
      if (window.innerWidth <= 768) {
        setViewMode("card");
      }
    };

    updateViewMode();
    window.addEventListener("resize", updateViewMode);
    return () => window.removeEventListener("resize", updateViewMode);
  }, []);

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
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Inline card view"
              className={`rounded-sm p-2 transition ${
                viewMode === "inline"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setViewMode("inline")}
            >
              <List size={18} weight="bold" />
            </button>
            <button
              type="button"
              aria-label="Normal card view"
              className={`rounded-sm p-2 transition ${
                viewMode === "card"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setViewMode("card")}
            >
              <SquaresFour size={18} weight="bold" />
            </button>
          </div>
        </div>
        <div className="mt-4 w-full max-w-4xl">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search posts..."
            type="search"
            aria-label="Search posts"
          />
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
            <div
              className={`mt-4 ${
                viewMode === "inline"
                  ? "space-y-3"
                  : "grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {posts.map((post) =>
                viewMode === "inline" ? (
                  <InlinePostCard key={post.id} post={post} />
                ) : (
                  <LazyPostCard key={post.id} post={post} />
                ),
              )}
            </div>
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
