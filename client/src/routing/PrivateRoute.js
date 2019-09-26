import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export default ({ component: Component, propsForComponent, ...rest }) => {
  const loggedIn = useSelector(state => state.auth.loggedIn);
  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <Component {...props} {...propsForComponent} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
