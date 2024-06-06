import { Author as AuthorType } from "@/types/posts";
import { twMerge } from "tailwind-merge";

import Image from "../Image";

const Author = ({
  author,
  size = 64,
  imageClassName,
}: {
  author: AuthorType;
  imageClassName?: string;
  size?: number;
}) => (
  <div className="flex items-center gap-4">
    <Image
      src={author?.image}
      alt="author's avatar"
      width={size}
      height={size}
      fill={false}
      className={twMerge("w-16 h-16 rounded-full", imageClassName)}
    />
    <div>
      <h3 className="text-md">{author.firstName ?? author.email}</h3>
      <h3 className="text-sm text-gray-500">Author's description</h3>
    </div>
  </div>
);

export default Author;
