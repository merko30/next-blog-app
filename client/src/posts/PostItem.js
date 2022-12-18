import React, { memo } from "react";
import { Link } from "react-router-dom";
import distanceInWordsToNow from "date-fns/formatDistanceToNow";

import Avatar from "shared/Avatar";
import Image from "shared/Image";

const PostItem = ({
  post: {
    _id,
    createdAt,
    title,
    body,
    image,
    slug,
    author: { name, username, avatar },
  },
  className = "",
}) => {
  return (
    <Link
      to={{ pathname: `/posts/${slug}/${_id}` }}
      data-testid="post-link"
      className={["shadow", className].join(" ")}
    >
      <div className="p-2">
        <div className="pb-2 border-b-t  flex items-center">
          <Avatar src={avatar} size="sm" alt={title} />
          <div>
            <h3>{name || username}</h3>
            <p className="text-gray-600 text-xs">
              {distanceInWordsToNow(new Date(createdAt))} ago
            </p>
          </div>
        </div>
        <Image src={image} alt={title} height="200px" />
        <div className="px-1 mt-1">
          <h2 className="font-bold truncate text-gray-900">{title}</h2>
          <p className="text-gray-600 truncate text-xs">{body}</p>
        </div>
      </div>
    </Link>
  );
};

export default memo(PostItem);
