import React from "react";

import Avatar from "./Avatar";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

const Author = ({ author, createdAt }) => {
  return (
    <div className="flex items-center mb-2 pb-3">
      <Avatar src={author.avatar} alt="author avatar" size={16} />
      <div className="ml-2">
        <h3 className="font-bold uppercase">
          {author.name || author.username}
        </h3>
        <p className="text-sm text-gray-600">
          {distanceInWordsToNow(createdAt)}
        </p>
      </div>
    </div>
  );
};

export default Author;
