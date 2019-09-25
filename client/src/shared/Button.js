import React from "react";

export default ({
  onClick,
  type,
  color = "blue",
  textColor = "white",
  ...props
}) => (
  <button
    className={`w-full block bg-${color}-500 hover:bg-${color}-600 text-${textColor} p-2 rounded`}
    type={type}
    onClick={onClick}
    {...props}
  >
    {props.children}
  </button>
);
