import React from "react";

export default ({ error }) => {
  return (
    <div className="my-2 border rounded border-red-600 p-2">
      <p className="text-red-600 uppercase">{error}</p>
    </div>
  );
};
