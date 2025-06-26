import { twMerge } from "tailwind-merge";

const Input = ({
  className,
  label,
  error,
  containerClassName,
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { label?: string; error?: string; containerClassName?: string }) => (
  <div className={twMerge("w-full", containerClassName)}>
    {label && (
      <label className="text-xs font-medium uppercase mb-2">{label}</label>
    )}
    <input
      {...props}
      className={twMerge(
        "p-4 border border-gray-200 rounded block w-full",
        className
      )}
    />
    {error && <p className="text-red-600 text-sm mt-0.5">{error}</p>}
  </div>
);

export default Input;
