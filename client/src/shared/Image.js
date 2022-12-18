const Image = ({ src, alt, height }) => {
  return (
    <img
      src={`${process.env.REACT_APP_BASE_URL}/uploads/${src}`}
      onError={(e) => {
        e.target.src = `${process.env.PUBLIC_URL}/img/defaultImage.svg`;
      }}
      alt={alt}
      style={{ height, width: "100%", objectFit: "cover" }}
    />
  );
};

export default Image;
