import { twMerge } from "tailwind-merge";
import { User } from "@prisma/client";

import Image from "./Image";

const UserInfo = ({
  user,
  size = 64,
  imageClassName,
}: {
  user: User;
  size?: number;
  imageClassName?: string;
}) => {
  return (
    <div className="flex items-center gap-4">
      <Image
        src={user.image!}
        alt={user.name}
        width={size}
        height={size}
        className={twMerge("w-16 h-16 rounded-full", imageClassName)}
        placeholderType="user"
      />
      <div>
        <h3 className="text-md">
          {user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.name}
        </h3>
        {user.shortDescription && (
          <h3 className="text-sm text-gray-500">{user.shortDescription}</h3>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
