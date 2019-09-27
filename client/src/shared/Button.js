import React from "react";

const Button = ({
  onClick,
  type,
  color = "blue",
  textColor = "white",
  block = true,
  classes,
  ...props
}) => (
  <button
    className={`${
      block ? "block w-full" : "inline px-3"
    } bg-${color}-500 hover:bg-${color}-600 text-${textColor} p-2 rounded ${classes}`}
    type={type}
    onClick={onClick}
    {...props}
  >
    {props.children}
  </button>
);

export default Button;
