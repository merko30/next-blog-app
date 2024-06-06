"use client";

import NextImage, { ImageProps } from "next/image";

const PLACEHOLDER = "/posts/800x600.svg";

const Image = (props: ImageProps) => {
  const src = props.src && props.src !== "" ? props.src : "/posts/800x600.svg";

  return (
    <NextImage
      {...props}
      style={{ objectFit: "cover" }}
      loader={(props) => `https://s3.tebi.io/mernbucket${props.src}`}
      src={src}
    />
  );
};

export default Image;
