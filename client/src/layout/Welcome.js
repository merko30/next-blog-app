import React from "react";

const Welcome = ({ title = "blog" }) => (
  <div className="flex items-center justify-center flex-col mb-12">
    <img
      src={`${process.env.PUBLIC_URL}/img/welcome.svg`}
      alt="welcome"
      style={{ width: "400px", height: "400px" }}
      className="px-2"
    />
    <h1 className="text-yellow-600 text-3xl font-bold">Welcome to {title}</h1>
    <h3 className="text-gray-700 text-lg text-center px-4 w-full md:px-0 md:w-1/2">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </h3>
  </div>
);

export default Welcome;
