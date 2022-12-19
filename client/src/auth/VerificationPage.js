// import QueryString from "query-string";
import { Link } from "react-router-dom";

import Error from "shared/Error";
import Button from "shared/Button";

const Verification = () => {
  let error, loading;

  // TODO: handle verification

  return (
    <div className="flex justify-center items-center h-full">
      {error && (
        <>
          <Error error={error} />
          <Button color="yellow">
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
