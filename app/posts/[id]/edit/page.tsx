import { Post } from "@prisma/client";

import PostForm from "@/components/posts/PostForm";

import { getEnv } from "@/lib/env";
import { editPostAction } from "./action";

async function getData(id: string): Promise<{ post: Post }> {
  const response = await fetch(`${getEnv("NEXT_PUBLIC_API_URL")}/posts/${id}`, {
    headers: { "Content-Type": "application/json" },
  });

  const json = await response.json();

  return json;
}

const EditPostPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const data = await getData(params.id);

  const { post } = data || {};

  if (post) {
    return (
      <div className="w-full lg:w-2/3 mx-auto">
        <h1 className="text-2xl mb-8">Edit your post</h1>
        <PostForm post={post} action={editPostAction} />
      </div>
    );
  }
  return <h1>post not found</h1>;
};

export default EditPostPage;
