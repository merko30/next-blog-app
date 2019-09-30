import React from "react";
import { Link } from "react-router-dom";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
import Avatar from "../../shared/Avatar";

const PostItem = ({
  post: {
    _id,
    createdAt,
    title,
    body,
    image,
    author: { name, avatar }
  }
}) => {
  return (
    <Link to={`/posts/${_id}`} data-testid="post-link" className="shadow">
      <div className="p-2">
        <div className="pb-2 border-b-t  flex items-center">
          <Avatar src={avatar} size={12} alt={title} />
          <div>
            <h3>{name}</h3>
            <p className="text-gray-600 text-xs">
              {distanceInWordsToNow(createdAt)} ago
            </p>
          </div>
        </div>
        <img
          src={`${process.env.REACT_APP_BASE_URL}/uploads/${image}`}
          onError={e =>
            (e.target.src = `${process.env.PUBLIC_URL}/img/defaultImage.svg`)
          }
          className="image"
          alt={title}
          style={{ height: "200px", width: "100%", objectFit: "cover" }}
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
