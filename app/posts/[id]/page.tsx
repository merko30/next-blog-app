import { Post } from "@/types/posts";

import Image from "@/components/Image";
import AuthorActions from "@/components/posts/AuthorActions";
import Comments from "@/components/posts/Comments";
import CommentForm from "@/components/posts/CommentForm";
import Author from "@/components/Author";

import { getEnv } from "@/lib/env";
import { User } from "@prisma/client";

async function getData(id: string): Promise<{ post: Post }> {
  const response = await fetch(`${getEnv("NEXT_PUBLIC_API_URL")}/posts/${id}`, {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 5 },
  });

  const json = await response.json();

  return json;
}

const PostDetails = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const data = await getData(params.id);

  console.log(data);

  const { post } = data;

  return (
    <div className="w-full lg:w-1/2 mx-auto flex flex-col gap-4">
      <h1 className="text-4xl">{post.title}</h1>
      <Image
        src={post.image!}
        alt={post.title}
        width={0}
        height={0}
        className="h-96 w-full"
        priority
      />
      <div className="flex items-center justify-between w-full">
        <Author user={post.author as User} />
        <AuthorActions author={post.author} postId={post.id} />
      </div>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      {!!post.comments?.length && (
        <>
          <h2 className="text-xl font-medium">Comments</h2>
          <Comments comments={post.comments} />
        </>
      )}
      <hr className="mb-6" />
      <CommentForm />
    </div>
  );
};

export default PostDetails;
