import React from "react";

const Avatar = ({ src, size, alt }) => {
  return (
    <img
      src={`${process.env.REACT_APP_BASE_URL}/uploads/${src}`}
      alt={alt}
      onError={e =>
        (e.target.src = `${process.env.PUBLIC_URL}/img/defaultAvatar.svg`)
      }
      className={`w-${size} h-${size} rounded-full p-1 border border-gray-300 mr-2`}
      style={{ objectFit: "cover" }}
    />
  );
};

export default Avatar;
