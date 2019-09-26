import React from "react";

export default ({
  onClick,
  type,
  color = "blue",
  textColor = "white",
  block = true,
  ...props
}) => (
  <button
    className={`my-2 ${
      block ? "block w-full" : "inline px-3"
    } bg-${color}-500 hover:bg-${color}-600 text-${textColor} p-2 rounded`}
    type={type}
    onClick={onClick}
    {...props}
  >
    {props.children}
  </button>
);
