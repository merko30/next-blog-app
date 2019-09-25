import React from "react";
import { useSelector } from "react-redux";

import NavItem from "./NavItem";

export default () => {
  const loggedIn = useSelector(state => state.auth.loggedIn);
  return (
    <div className="py-6 px-5 md:px-20 flex justify-between">
      <div>logo</div>
      <ul>
        {!loggedIn && <NavItem to="/register">Register</NavItem>}
        {!loggedIn && <NavItem to="/login">Login</NavItem>}
        {loggedIn && <NavItem to="/posts/add">Add post</NavItem>}
      </ul>
    </div>
  );
};
