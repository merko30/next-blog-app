import React from "react";

const Error = ({ error }) => {
  return (
    <div className="my-2 border rounded border-red-600 p-2">
      <p className="text-red-600 uppercase">{error}</p>
    </div>
  );
};

export default Error;
