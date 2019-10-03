import React from "react";
import { useDispatch } from "react-redux";
import { clearMessage } from "../messages/messages.actions";

const Message = ({ message, color, classes }) => {
  const dispatch = useDispatch();

  return (
    <div
      className={`border rounded border-${color}-600 p-2 my-2 ${classes}`}
      onClick={() => dispatch(clearMessage())}
    >
      <p className={`text-${color}-700 uppercase`}>{message}</p>
    </div>
  );
};

export default Message;
