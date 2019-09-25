import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../auth/auth.actions";

import LoginForm from "../auth/components/LoginForm";

const Login = () => {
  const error = useSelector(state => state.auth.error);
  const dispatch = useDispatch();

  return (
    <div className="pt-10 md:pt-20 flex items-center justify-center">
      <LoginForm onSubmit={data => dispatch(login(data))} error={error} />
    </div>
  );
};

export default Login;
