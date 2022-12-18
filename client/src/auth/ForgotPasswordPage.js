import { Formik, Field } from "formik";
import * as Yup from "yup";

import Input from "shared/Input";
import Button from "shared/Button";
import Message from "shared/Message";
import Error from "shared/Error";

// import { forgotPassword } from "./auth.actions";

const ForgotPassword = () => {
  let error, message;

  // TODO: handle forgot password

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .required("It is required to proceed")
          .email("Wrong email format"),
      })}
      onSubmit={(values) => console.log("values")}
    >
      {message && <Message color="green" message={message} />}
      {error && <Error error={error} />}
      <Field component={Input} name="email" label="Your email" />
      <Button color="teal">Request new password</Button>
    </Formik>
  );
};

export default ForgotPassword;
