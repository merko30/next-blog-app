import React from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import QueryString from "query-string";

import FormContainer from "../layout/FormContainer";

import Input from "../shared/Input";
import Button from "../shared/Button";
import Message from "../shared/Message";

import { resetPassword } from "./auth.actions";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("It is required")
    .min(8, "Password should have at least 8 characters"),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Confirm password should match password"
    )
    .required("Password confirm is required"),
});

const ResetPassword = ({ location: { search } }) => {
  const { token } = QueryString.parse(search);

  let message;

  // TODO: handle reset password

  return (
    <Formik
      initialValues={{ password: "", confirmPassword: "" }}
      onSubmit={(values) => resetPassword(values.password, token)}
      validationSchema={validationSchema}
    >
      <div>
        <FormContainer>
          {message && <Message color="green" message={message} />}
          <Field
            component={Input}
            name="password"
            type="password"
            label="New password"
          />
          <Field
            component={Input}
            name="confirmPassword"
            type="password"
            label="Confirm your new password"
          />
          <Button type="submit" color="green">
            Reset password
          </Button>
        </FormContainer>
      </div>
    </Formik>
  );
};

export default ResetPassword;
