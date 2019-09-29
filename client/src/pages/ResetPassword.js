import React from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import QueryString from "query-string";

import FormContainer from "../layout/FormContainer";

import Input from "../shared/Input";
import Button from "../shared/Button";
import Message from "../shared/Message";

import { resetPassword } from "../auth/auth.actions";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("It is required")
    .min(8, "Password should have at least 8 characters"),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Confirm password should match password"
    )
    .required("Password confirm is required")
});

const ResetPassword = ({ location: { search } }) => {
  const message = useSelector(state => state.auth.message);
  const dispatch = useDispatch();
  const { token } = QueryString.parse(search);

  return (
    <Formik
      initialValues={{ password: "", confirmPassword: "" }}
      onSubmit={values => dispatch(resetPassword(values.password, token))}
      validationSchema={validationSchema}
    >
      <div>
        <FormContainer>
          {message && <Message color="green" message={message} />}
          <Field component={Input} name="password" label="New password" />
          <Field
            component={Input}
            name="confirmPassword"
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
