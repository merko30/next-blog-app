import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import Input from "../../shared/Input";
import Button from "../../shared/Button";
import Error from "../../shared/Error";

const validationSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required("This field is required"),
  password: Yup.string().required("Password is required field")
});

const Login = ({ onSubmit, error }) => {
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
          <Form className="p-4 mx-auto w-full md:w-1/3">
            {error && <Error error={error} />}
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
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
