import React, { useState } from "react";

export default ({ setFieldValue, name, allowedTypes = [], allowedSize }) => {
  const handleChange = e => {
    const file = e.target.files[0];
    const validType = allowedTypes.includes(file.type);
    const validSize = allowedSize > file.size;

    if (validSize && validType) {
      console.log(file);
      setFieldValue(name, file);
    }
  };

  return <input type="file" name="file" onChange={handleChange} />;
};
