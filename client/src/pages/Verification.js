import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import QueryString from "query-string";
import { verifyEmail } from "../auth/auth.actions";

const Verification = ({ location: { search } }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(QueryString.parse(search));
    const { token, email } = QueryString.parse(search);
    dispatch(verifyEmail(email, token));
  }, []);

  return <div>verification page</div>;
};

export default Verification;
