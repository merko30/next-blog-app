import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Input from "../shared/Input";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("It is required")
    .min(8, "Password should have at least 8 characters"),
  confirmPassword: Yup.string()
    .equalTo(Yup.ref("password"), "Passwords must match")
    .required("It is required to proceed")
});

const ResetPassword = ({}) => {
  return (
    <Formik
      initialValues={{ password: "", confirmPassword: "" }}
      onSubmit={values => console.log(values)}
      validationSchema={validationSchema}
    >
      <Form>
        <Field component={Input} name="password" label="New password" />
        <Field
          component={Input}
          name="confirmPassword"
          label="Confirm your new password"
        />
      </Form>
    </Formik>
  );
};

export default ResetPassword;
