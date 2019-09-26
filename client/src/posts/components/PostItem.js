import React from "react";
import { Link } from "react-router-dom";
import { distanceInWordsToNow } from "date-fns";
import Avatar from "../../shared/Avatar";

const PostItem = ({
  post: {
    _id,
    createdAt,
    title,
    body,
    image,
    author: { name }
  }
}) => {
  return (
    <Link to={`/posts/${_id}`} data-testid="post-link" className="shadow">
      <div className="p-2">
        <div className="pb-2 border-b-t  flex items-center">
          <Avatar
            src="http://res.publicdomainfiles.com/pdf_view/185/14006695215558.jpg"
            size={12}
            alt={title}
          />
          <div>
            <h3>{name}</h3>
            <p className="text-gray-600 text-xs">
              {distanceInWordsToNow(createdAt)} ago
            </p>
          </div>
        </div>
        <img
          src={
            image
              ? `uploads/${image}`
              : "http://res.publicdomainfiles.com/pdf_view/185/14006695215558.jpg"
          }
          className="image"
          alt={title}
        />
        <div className="px-1 mt-1">
          <h2 className="font-bold truncate text-gray-900">{title}</h2>
          <p className="text-gray-600 truncate text-xs">{body}</p>
        </div>
      </div>
    </Link>
  );
};

export default PostItem;
