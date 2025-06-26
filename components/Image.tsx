"use client";

import NextImage, { ImageProps } from "next/image";

const PLACEHOLDER_MAP = {
  post: "/placeholder.jpg",
  user: "/avatar.png",
};

const Image = ({
  src,
  placeholderType = "post",
  ...props
}: ImageProps & {
  placeholderType?: keyof typeof PLACEHOLDER_MAP;
}) => {
  const hasSrc = src && src !== "";

  return (
    <NextImage
      {...props}
      src={
        !hasSrc
          ? PLACEHOLDER_MAP[placeholderType as keyof typeof PLACEHOLDER_MAP]
          : `/api/image/${src}`
      }
      style={{ objectFit: "cover" }}
      unoptimized={true} // important if you proxy images yourself
      alt={props.alt}
    />
  );
};

export default Image;
