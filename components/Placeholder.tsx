import { twMerge } from "tailwind-merge";

const Placeholder = ({
  icon: Icon,
  title,
  text,
  className,
  titleClassName,
}: {
  icon: React.ElementType;
  title: string;
  text?: string;
  className?: string;
  titleClassName?: string;
}) => (
  <div
    className={twMerge(
      "flex flex-col items-center justify-center sm:py-12 md:py-24 text-center",
      className
    )}
  >
    <Icon size={120} />
    <h1 className={twMerge("text-2xl mt-4 text-black", titleClassName)}>
      {title}
    </h1>
    {text && <p className="text-gray-700 text-sm">{text}</p>}
  </div>
);

export default Placeholder;
