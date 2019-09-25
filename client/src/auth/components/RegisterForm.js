import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import Input from "../../shared/Input";
import Button from "../../shared/Button";
import Error from "../../shared/Error";

const validationSchema = Yup.object().shape({
  name: Yup.string(),
  username: Yup.string()
    .required("Username is required field")
    .min(8, "Name should be longer than 8 characters"),
  email: Yup.string("Email is required field")
    .required("Email is required field")
    .email("Wrong email format"),
  password: Yup.string()
    .required("Password is required field")
    .min(8, "Password should be longer than 8 characters")
});

export default ({ onSubmit, error }) => {
  return (
    <>
      <Formik
        initialValues={{ name: "", username: "", email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values);
          setSubmitting(false);
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form className="p-4 mx-auto w-full md:w-1/3">
            {error && <Error error={error} />}
            <Field name="name" component={Input} label="Name" />
            <Field name="username" component={Input} label="Username" />
            <Field name="email" component={Input} label="Email" />
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
