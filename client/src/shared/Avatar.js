import React from "react";

const Avatar = ({ src, size, alt }) => {
  const avatar = src
    ? `${process.env.REACT_APP_BASE_URL}/uploads/${src}`
    : `${process.env.PUBLIC_URL}/img/image.jpeg`;
  return (
    <img
      src={avatar}
      alt={alt}
      className={`w-${size} h-${size} rounded-full p-1 border border-gray-300 mr-2`}
      style={{ objectFit: "cover" }}
    />
  );
};

export default Avatar;
