import React from "react";

const Message = ({ message, color }) => {
  return (
    <div className={`border rounded border-${color}-600 p-2 my-2`}>
      <p className={`text-${color}-700 uppercase`}>{message}</p>
    </div>
  );
};

export default Message;
