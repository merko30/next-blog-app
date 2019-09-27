import React from "react";

const Avatar = ({ src, size, alt }) => (
  <img
    src={
      `http://localhost:5000/uploads/${src}` ||
      process.env.PUBLIC_URL + "/img/image.jpeg"
    }
    alt={alt}
    className={`w-${size} h-${size} rounded-full p-1 border border-gray-300 mr-2`}
    style={{ objectFit: "cover" }}
  />
);

export default Avatar;
