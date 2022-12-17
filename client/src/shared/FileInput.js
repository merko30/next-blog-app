import React, { useState } from "react";

const FileInput = ({
  name,
  onChange,
  allowedTypes = ["image/jpg", "image/jpeg", "image/png"],
  allowedSize = [5 * 1024 * 1024],
  label,
  error,
}) => {
  const [errors, setErrors] = useState({});

  const handleChange = async (e) => {
    setErrors({});
    const file = e.target.files[0];
    if (file) {
      const validType = allowedTypes.includes(file.type);
      const validSize = allowedSize > file.size;

      if (!validType) {
        setErrors((prev) => {
          return { ...prev, type: "Wrong file type" };
        });
      }
      if (!validSize) {
        setErrors((prev) => {
          return { ...prev, size: "File is too large" };
        });
      }

      if (validSize && validType) {
        onChange(file);
      }
    }
  };

  return (
    <div className="my-2">
      {label && <label htmlFor={name}>{label}</label>}
      <input type="file" name={name} onChange={handleChange} />
      {Object.keys(errors).length > 0 &&
        Object.keys(errors).map((key) => {
          return (
            <p className="text-red-600" key={key}>
              {errors[key]}
            </p>
          );
        })}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default FileInput;
