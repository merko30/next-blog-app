import { inputStyle, labelStyle } from "@/utils/classes";

const Input = ({
  className,
  label,
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { label?: string }) => (
  <div className="w-full">
    {label && <label className={labelStyle}>{label}</label>}
    <input {...props} className={`${inputStyle} ${className}`} />
  </div>
);

export default Input;
