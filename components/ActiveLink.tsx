"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

const ActiveLink = ({
  children,
  activeClass = "font-bold",
  className = "",
  ...props
}: LinkProps & {
  children: React.ReactNode;
  activeClass?: string;
  className?: string;
}) => {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      className={`${className} ${pathname === props.href ? activeClass : ""}`}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
