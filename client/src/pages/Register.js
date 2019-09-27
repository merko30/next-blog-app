import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import RegisterForm from "../auth/components/RegisterForm";
import { register, clearError } from "../auth/auth.actions";

const Register = () => {
  const error = useSelector(state => state.auth.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, []);

  return (
    <div className="pt-5 flex items-center justify-center">
      <RegisterForm onSubmit={data => dispatch(register(data))} error={error} />
    </div>
  );
};

export default Register;
