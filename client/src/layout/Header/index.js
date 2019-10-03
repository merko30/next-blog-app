import React from "react";
import { useSelector, useDispatch } from "react-redux";

import NavItem from "./NavItem";
import Button from "../../shared/Button";
import { logout } from "../../auth/auth.actions";

export default () => {
  const loggedIn = useSelector(state => state.auth.loggedIn);
  const dispatch = useDispatch();
  return (
    <div className="py-3 py-2 px-5 md:px-20 flex justify-between nav-shadow mb-5 items-center">
      <div>
        <NavItem to="/">logo</NavItem>
      </div>
      <ul>
        {!loggedIn && <NavItem to="/register">Register</NavItem>}
        {!loggedIn && <NavItem to="/login">Login</NavItem>}
        {loggedIn && <NavItem to="/posts/add">Add post</NavItem>}
        {loggedIn && <NavItem to="/profile">Profile</NavItem>}
        {loggedIn && (
          <Button
            color="orange"
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
