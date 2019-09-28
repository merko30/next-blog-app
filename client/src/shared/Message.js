import React from "react";

const Message = ({ message }) => {
  return (
    <div className=" border rounded border-orange-600 p-2">
      <p className="text-orange-700 uppercase">{message}</p>
    </div>
  );
};

export default Message;
