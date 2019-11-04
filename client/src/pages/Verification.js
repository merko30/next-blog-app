import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import QueryString from "query-string";
import { verifyEmail } from "../auth/auth.actions";

const Verification = ({ location: { search } }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const { token, email } = QueryString.parse(search);
    dispatch(verifyEmail(email, token));
  }, []);

  return (
    <div className="flex justify-center items-center">
      <h1>Verification in process</h1>
      <h3 className="text-gray-700">You will be redirected soon</h3>
    </div>
  );
};

export default Verification;
