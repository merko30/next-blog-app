import React from "react";
import { useSelector, useDispatch } from "react-redux";

import NavItem from "./NavItem";
import Button from "../../shared/Button";
import { logout } from "../../auth/auth.actions";

export default () => {
  const loggedIn = useSelector(state => state.auth.loggedIn);
  const dispatch = useDispatch();
  return (
    <div className="py-3 px-5 md:px-20 flex justify-between nav-shadow mb-5 items-center">
      <NavItem to="/">
        <img
          src={`${process.env.PUBLIC_URL}/img/blog.svg`}
          alt="blog logo"
          className="w-12 h-12"
          style={{ transform: "rotate(24deg)" }}
        />
      </NavItem>
      <ul>
        {!loggedIn && <NavItem to="/register">Register</NavItem>}
        {!loggedIn && <NavItem to="/login">Login</NavItem>}
        {loggedIn && <NavItem to="/posts/add">Add post</NavItem>}
        {loggedIn && <NavItem to="/profile">Profile</NavItem>}
        {loggedIn && (
          <Button
            color="yellow"
            classes="mx-2"
            block={false}
            onClick={() => dispatch(logout())}
          >
            Logout
          </Button>
        )}
      </ul>
    </div>
  );
};
