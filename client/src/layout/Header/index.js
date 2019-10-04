import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import NavItem from "./NavItem";
import Button from "../../shared/Button";
import { logout } from "../../auth/auth.actions";
import MenuButton from "./MenuButton";

const Header = () => {
  const [active, setActive] = useState(false);

  const loggedIn = useSelector(state => state.auth.loggedIn);
  const dispatch = useDispatch();

  const isActive = active ? "flex" : "hidden";
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-center md:justify-between shadow mb-5 py-3 px-5 md:px-20">
      <Link to="/">
        <img
          src={`${process.env.PUBLIC_URL}/img/blog.svg`}
          alt="blog logo"
          className="w-12 h-12"
          style={{ transform: "rotate(24deg)" }}
        />
      </Link>
      <MenuButton onClick={() => setActive(!active)} />
      <ul
        className={`${isActive} my-3 md:my-0 w-full md:w-auto md:items-center px-2 md:px-0 flex-col md:flex md:flex-row`}
      >
        <NavItem to="/posts">See posts</NavItem>
        {!loggedIn && <NavItem to="/register">Register</NavItem>}
        {!loggedIn && <NavItem to="/login">Login</NavItem>}
        {loggedIn && <NavItem to="/posts/add">Add post</NavItem>}
        {loggedIn && <NavItem to="/profile">Profile</NavItem>}
        {loggedIn && (
          <Button
            color="yellow"
            classes="my-4 border-b md:my-0 md:border-0 md:mx-2"
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

export default Header;
