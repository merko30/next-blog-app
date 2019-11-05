import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QueryString from "query-string";
import { Link } from "react-router-dom";

import { verifyEmail } from "../auth/auth.actions";
import Error from "../shared/Error";
import Button from "../shared/Button";

const Verification = ({ location: { search } }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(({ auth }) => auth);

  useEffect(() => {
    const { token, email } = QueryString.parse(search);
    dispatch(verifyEmail(email, token));
  }, []);

  return (
    <div className="flex justify-center items-center h-full">
      {error && (
        <>
          <Error error={error} />
          <Button color="yellow" block={false}>
            <Link to="/">Go home</Link>
          </Button>
        </>
      )}
      {loading && (
        <>
          <h1>Verification in process</h1>
          <h3 className="text-gray-700">You will be redirected soon</h3>
        </>
      )}
    </div>
  );
};

export default Verification;
