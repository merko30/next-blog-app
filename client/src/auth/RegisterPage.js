import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { register } from "./auth.actions";

import Error from "shared/Error";
import Loading from "shared/Loading";

import RegisterForm from "./RegisterForm";

const Register = () => {
  const navigate = useNavigate();
  const { isLoading, error, mutate } = useMutation((input) => register(input), {
    onSuccess: () => navigate("/login"),
  });

  return (
    <div className="w-full md:w-1/2 mx-auto">
      <h1 className="text-3xl text-center mb-12">Join today</h1>

      {isLoading && <Loading />}
      {error && (
        <Error error={error.response?.data.message || "Something went wrong"} />
      )}
      <RegisterForm onSubmit={mutate} />
    </div>
  );
};

export default Register;
