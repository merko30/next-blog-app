import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import Input from "../../shared/Input";
import Button from "../../shared/Button";
import Error from "../../shared/Error";
import FormContainer from "../../layout/FormContainer";
import Loading from "../../shared/Loading";
import Message from "../../shared/Message";

const validationSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required("This field is required"),
  password: Yup.string().required("Password is required field")
});

const Login = ({ onSubmit, error, loading, message }) => {
  return (
    <>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values);
          setSubmitting(false);
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <FormContainer>
            {loading && <Loading />}
            {error && <Error error={error} />}
            {message && <Message message={message} color="green" />}

            <Field
              name="usernameOrEmail"
              component={Input}
              label="Email or username"
            />
            <Field
              name="password"
              type="password"
              component={Input}
              label="Password"
            />
            <Button color="green" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
            <Link to="/forgot_password">Forgot your password ?</Link>
          </FormContainer>
        )}
      </Formik>
    </>
  );
};

export default Login;
