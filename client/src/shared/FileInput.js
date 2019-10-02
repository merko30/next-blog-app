import React, { useState } from "react";

const FileInput = ({
  setFieldValue,
  name,
  allowedTypes = [],
  allowedSize,
  label
}) => {
  const [errors, setErrors] = useState({});

  const handleChange = async e => {
    setErrors({});
    const file = e.target.files[0];
    if (file) {
      const validType = allowedTypes.includes(file.type);
      const validSize = allowedSize > file.size;

      if (!validType) {
        setErrors(prev => {
          return { ...prev, type: "Wrong file type" };
        });
      }
      if (!validSize) {
        setErrors(prev => {
          return { ...prev, size: "File is too large" };
        });
      }

      if (validSize && validType) {
        setFieldValue(name, file);
      }
    }
  };

  return (
    <div className="my-2">
      {label && <label>{label}</label>}
      <input type="file" name="file" onChange={handleChange} />
      {Object.keys(errors).length > 0 &&
        Object.keys(errors).map(key => {
          return (
            <p className="text-red-600" key={key}>
              {errors[key]}
            </p>
          );
        })}
    </div>
  );
};

export default FileInput;
