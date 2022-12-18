const SIZES = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-24 h-24",
};

const Avatar = ({ src, size = "md", alt }) => {
  const sizeClass = SIZES[size] ?? SIZES.md;
  return (
    <img
      src={`${process.env.REACT_APP_BASE_URL}/uploads/${src}`}
      alt={alt}
      onError={(e) =>
        (e.target.src = `${process.env.PUBLIC_URL}/img/defaultAvatar.svg`)
      }
      className={`${sizeClass} rounded-full border-2 border-gray-300 mr-2`}
      style={{ objectFit: "cover", padding: "2px" }}
    />
  );
};

export default Avatar;
