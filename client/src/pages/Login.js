import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { login } from "../auth/auth.actions";

import Error from "../shared/Error";
import Loading from "../shared/Loading";

import LoginForm from "../auth/components/LoginForm";

const Login = () => {
  const navigate = useNavigate();
  const { isLoading, error, mutate } = useMutation((data) => login(data), {
    onSuccess: () => navigate("/"),
  });

  return (
    <div className="w-full md:w-1/2 mx-auto pt-20">
      {isLoading && <Loading />}
      {error && <Error error={error.response?.data.message} />}
      <LoginForm onSubmit={mutate} />
    </div>
  );
};

export default Login;
