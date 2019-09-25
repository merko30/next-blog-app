import React from "react";
import NavItem from "./NavItem";

export default () => {
  return (
    <div className="py-6 px-5 md:px-20 flex justify-between">
      <div>logo</div>
      <ul>
        <NavItem to="/register">Register</NavItem>
        <NavItem to="/login">Login</NavItem>
      </ul>
    </div>
  );
};
