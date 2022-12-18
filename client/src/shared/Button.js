// tailwind doesn't allow generating classes dynamically
const CLASSES = {
  blue: "btn-blue",
  green: "btn-green",
  yellow: "btn-yellow",
  teal: "btn-teal",
  orange: "btn-orange",
};

const Button = ({ color = "blue", classes = "", children, ...props }) => {
  const background = CLASSES[color] ?? CLASSES.blue;
  return (
    <button
      className={[background, "text-white px-4 py-2 rounded", classes].join(
        " "
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
