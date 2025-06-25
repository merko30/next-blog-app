import { Post } from "@prisma/client";

import PostForm from "@/components/posts/PostForm";

import { API_URL } from "@/lib/env";

async function getData(id: string): Promise<{ post: Post }> {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    headers: { "Content-Type": "application/json" },
  });

  const json = await response.json();

  return json;
}

const EditPostPage = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);

  const { post } = data || {};

  if (post) {
    return (
      <div className="w-full lg:w-2/3 mx-auto">
        <h1 className="text-2xl mb-8">Edit your post</h1>
        <PostForm post={post} type="edit" />
      </div>
    );
  }
  return <h1>post not found</h1>;
};

export default EditPostPage;
