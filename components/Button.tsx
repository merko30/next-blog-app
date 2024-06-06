import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

const Button = ({
  className,
  children,
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => (
  <button
    className={twMerge(
      "px-4 py-2 font-medium text-white rounded bg-green-500 hover:bg-green-600",
      className
    )}
  >
    {children}
  </button>
);

export default Button;
