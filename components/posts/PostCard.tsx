import Link from "next/link";

import { Post } from "@/types/posts";

import Image from "../Image";
import TimeAgo from "../TimeAgo";

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
      <h1 className="text-sm font-medium truncate">{post.title}</h1>
      {/* <p
        className="text-gray-800 text-sm truncate line-clamp-1"
        dangerouslySetInnerHTML={{ __html: post.content }}
      /> */}
      <div className="flex items-center gap-2 mt-4">
        <Image
          src={post.author.image}
          alt={post.author.username}
          placeholderType="user"
          width={40}
          height={40}
          className="rounded-full w-10 h-10 flex-none"
        />
        <div className="w-full">
          <h2 className="text-sm font-medium">{post.author.username}</h2>
          <p className="text-xs text-gray-700">
            <TimeAgo date={post.createdAt} />
          </p>
        </div>
      </div>
    </div>
  </Link>
);

export default PostCard;
