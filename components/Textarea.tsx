import { inputStyle, labelStyle } from "@/utils/classes";

const Textarea = ({
  className,
  label,
  ...props
}: React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & { label?: string }) => (
  <div className="w-full">
    {label && <label className={labelStyle}>{label}</label>}
    <textarea {...props} className={`${inputStyle} ${className}`} />
  </div>
);

export default Textarea;
