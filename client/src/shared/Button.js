import React from "react";

const Button = ({
  onClick,
  type,
  color = "blue",
  textColor = "white",
  block = true,
  classes,
  ...props
}) => {
  const bg = `bg-${color}-500 hover:bg-${color}-600`;

  return (
    <button
      className={`${
        block ? "block w-full" : "inline px-3"
      } ${bg} text-${textColor} p-2 rounded ${classes}`}
      type={type}
      onClick={onClick}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
