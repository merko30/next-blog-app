import React from "react";

export default ({ comment }) => (
  <div className="p-3 rounded-lg border border-grey-300 my-3">
    <div className="flex items-center mb-2 border-grey-400 border-b pb-3">
      <img
        src="http://res.publicdomainfiles.com/pdf_view/185/14006695215558.jpg"
        className="h-16 w-16 rounded-full border border-grey-400 p-1 object-cover mr-3"
        alt={comment.author.username}
      />
      <h3 className="font-bold uppercase">
        {comment.author.name || comment.author.username}
      </h3>
    </div>
    <h2>{comment.comment}</h2>
  </div>
);
