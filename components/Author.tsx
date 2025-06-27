import { twMerge } from "tailwind-merge";
import { User } from "@prisma/client";

import Image from "./Image";

const UserInfo = ({
  user,
  size = 64,
  imageClassName,
}: {
  user: User;
  imageClassName?: string;
  size?: number;
}) => (
  <div className="flex items-center gap-4">
    <Image
      src={user?.image!}
      alt={user.email}
      width={size}
      height={size}
      fill={false}
      placeholderType="user"
      className={twMerge("w-16 h-16 rounded-full", imageClassName)}
    />
    <div>
      <h3 className="text-md">{user.name ?? user.email}</h3>
      {user.shortDescription && (
        <h3 className="text-sm text-gray-500">{user.shortDescription}</h3>
      )}
    </div>
  </div>
);

export default UserInfo;
