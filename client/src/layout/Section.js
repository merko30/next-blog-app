import React from "react";

const Section = ({
  alignment = "left",
  title,
  children,
  image,
  alt,
  background
}) => {
  const side = alignment === "left" ? "order-first" : "order-last";
  return (
    <div
      className={`bg-${background}-100 py-10 flex flex-col md:flex-row justify-between items-center px-5 md:px-12 my-10`}
    >
      <div className={`md:${side} flex-1 px-16`}>
        <img src={image} alt={alt} style={{ width: "100%", height: "100%" }} />
      </div>
      <div className={`flex-1 px-16 mt-10 md:mt-0`}>
        <h1 className="text-4xl">{title}</h1>
        <p className="text-gray-600">{children}</p>
      </div>
    </div>
  );
};

export default Section;
