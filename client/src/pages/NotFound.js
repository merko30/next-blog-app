const NotFound = () => {
  return (
    <div className="flex items-center justify-center">
      <img
        src={`${process.env.PUBLIC_URL}/img/notFound.svg`}
        style={{ width: "600px", height: "600px" }}
        alt="Not found page"
      />
    </div>
  );
};

export default NotFound;
