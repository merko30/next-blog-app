import React from "react";
import { useMutation } from "react-query";

import { login } from "../auth/auth.actions";

import LoginForm from "../auth/components/LoginForm";
import Error from "../shared/Error";
import Loading from "../shared/Loading";

const Login = () => {
  const { isLoading, error, mutate } = useMutation((data) => login(data), {
    onSuccess: console.log,
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
