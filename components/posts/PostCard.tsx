import { formatDistance } from "date-fns/formatDistance";
import Link from "next/link";

import { Post } from "@/types/posts";

import Image from "../Image";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => (
  <Link
    href={`/posts/${post.id}`}
    key={post.id}
    className="shadow-xs rounded-sm overflow-x-hidden"
  >
    <div className="w-full h-40 relative">
      <Image src={post.image!} fill placeholder="empty" alt={post.title} />
    </div>
    <div className="py-3 px-2">
      <h1 className="text-sm font-medium">{post.title}</h1>
      <p
        className="text-gray-800 text-sm"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <div className="flex items-center gap-2 mt-4">
        <Image
          src={post.author.image}
          alt={post.author.name}
          width={0}
          height={0}
          className="rounded-full w-11 h-11 flex-none"
        />
        <div className="w-full">
          <h2 className="text-sm font-medium">{post.author.name}</h2>
          <p className="text-xs text-gray-700">
            {formatDistance(post.createdAt, Date.now(), { addSuffix: true })}
          </p>
        </div>
      </div>
    </div>
  </Link>
);

export default PostCard;
