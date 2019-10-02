import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const Like = ({ onClick, post, user }) => {
  const liked = user && post.likes.includes(user._id);
  const color = liked ? "gray" : "green";
  const personOrPeople = length =>
    length > 1 ? `${length} people` : `${length} person`;
  const text = () => {
    if (user && liked) {
      if (post.likes.length === 1) {
        return "You like this post";
      } else {
        return `You and ${personOrPeople(
          post.likes.length - 1
        )} like this post`;
      }
    } else {
      if (post.likes.length === 0) {
        return "Still no likes";
      } else {
        return `${personOrPeople(post.likes.length)} ${
          post.likes.length > 1 ? "like" : "likes"
        } this post`;
      }
    }
  };
  return (
    <div className={`p-2 flex items-center`}>
      <span
        className={`cursor-pointer border border-${color}-600 flex items-center justify-center p-3 mr-2 rounded-full`}
      >
        <FontAwesomeIcon
          title={liked ? "Dislike" : "Like"}
          icon={faThumbsUp}
          size={"lg"}
          onClick={e => {
            if (user) {
              onClick(post._id);
            } else {
              e.stopPropagation();
            }
          }}
          color={color}
        />
      </span>
      <p className="text-sm ml-2">{text()}</p>
    </div>
  );
};

export default Like;
