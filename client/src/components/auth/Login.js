import React from "react";
import LoginForm from "../forms/LoginForm";

const Login = ({ props }) => {
  return (
    <div className="login">
      <h1 className="center-text">Login</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
