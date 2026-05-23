import Link from "next/link";
import { Post, User } from "@prisma/client";

import Image from "../Image";
import TimeAgo from "../TimeAgo";

interface InlinePostCardProps {
  post: Post & {
    author: Partial<User>;
  };
}

const InlinePostCard = ({ post }: InlinePostCardProps) => (
  <Link
    href={`/posts/${post.id}`}
    className="group flex overflow-hidden rounded-sm border border-gray-200 bg-white transition hover:border-blue-500 hover:bg-gray-50"
  >
    <div className="relative h-48 w-64 flex-none overflow-hidden bg-gray-100 sm:w-56">
      <Image
        src={post.image!}
        alt={post.title}
        fill
        sizes="( max-width: 640px ) 100vw, 160px"
        placeholderType="post"
      />
    </div>
    <div className="flex flex-1 flex-col justify-between p-4">
      <div className="min-w-0">
        <h2 className="text-sm font-semibold leading-6 text-gray-900 truncate">
          {post.title}
        </h2>
        <p className="text-xs text-gray-500 mt-1 truncate">
          {post.author.username ?? "Unknown author"}
        </p>
      </div>
      <p className="text-xs text-gray-500 mt-4">
        <TimeAgo date={post.createdAt} />
      </p>
    </div>
  </Link>
);

export default InlinePostCard;
