import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import crypto from "crypto";

const Like = ({ onClick, post, user }) => {
  const liked = post.likes.includes(user._id);
  const color = liked ? "gray" : "green";
  const text = liked
    ? post.likes.length === 1
      ? "You like this post"
      : `You and ${post.likes.length - 1} like this post`
    : post.likes.length === 0
    ? `Still no likes`
    : `${post.likes.length} like this post`;

  return (
    <div className={`p-2 flex items-center`}>
      <div
        className={`cursor-pointer border border-${color}-600 flex items-center justify-center p-3 mr-2 rounded-full`}
      >
        <FontAwesomeIcon
          title={liked ? "Dislike" : "Like"}
          icon={faThumbsUp}
          size={"lg"}
          onClick={() => onClick(post._id)}
          color={color}
        />
      </div>
      <p className="text-sm ml-2">{text}</p>
    </div>
  );
};

export default Like;
