import React from "react";

// tailwind doesn't allow generating classes dynamically
const CLASSES = {
  blue: "btn-blue",
  green: "btn-green",
  yellow: "btn-yellow",
  teal: "btn-teal",
  orange: "btn-orange",
};

const Button = ({
  onClick,
  type = "button",
  color = "blue",
  classes,
  ...props
}) => {
  const background = CLASSES[color] ?? CLASSES.blue;
  return (
    <button
      onClick={onClick}
      type={type}
      className={[background, "text-white px-4 py-2 rounded", classes].join(
        " "
      )}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
