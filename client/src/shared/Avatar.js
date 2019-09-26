import React from "react";

const Avatar = ({ src, size, alt }) => (
  <img
    src={src}
    alt={alt}
    className={`w-${size} h-${size} rounded-full p-1 border border-gray-300 mr-2`}
  />
);

export default Avatar;
