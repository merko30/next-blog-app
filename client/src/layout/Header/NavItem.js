import React from "react";
import { Link } from "react-router-dom";

export default ({ to, children }) => (
  <Link to={to} className="mx-2 text-gray-900 hover:text-gray-800">
    {children}
  </Link>
);
