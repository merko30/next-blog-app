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
      "px-6 py-3 font-medium text-white uppercase tracking-wider rounded-full bg-primary-main",
      className
    )}
  >
    {children}
  </button>
);

export default Button;
