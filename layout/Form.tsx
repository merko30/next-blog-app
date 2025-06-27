import Image from "next/image";
import { twMerge } from "tailwind-merge";

const Layout = ({
  children,
  className,
  contentBoxClassName,
}: {
  children: React.ReactNode;
  className?: string;
  contentBoxClassName?: string;
}) => (
  <div className={twMerge("relative w-full pb-96", className)}>
    {/* Background image container */}
    <div className="relative h-48 w-full opacity-60">
      <Image
        src="/write.jpg"
        alt="writing-machine"
        fill
        className="object-cover object-top"
        priority
      />
    </div>

    {/* Floating content box */}
    <div
      className={twMerge(
        "absolute top-20 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-xl px-6 py-8 rounded-md bg-white shadow-sm",
        contentBoxClassName
      )}
    >
      {children}
    </div>
  </div>
);

export default Layout;
