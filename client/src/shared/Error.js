const Error = ({ error, classes = "" }) => {
  return (
    <div className={`my-2 border rounded border-red-600 p-2 my-2 ${classes}`}>
      <p className="text-red-600 uppercase">{error}</p>
    </div>
  );
};

export default Error;
