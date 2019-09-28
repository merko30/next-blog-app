import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import Input from "../shared/Input";
import Button from "../shared/Button";
import { forgotPassword } from "../auth/auth.actions";
import FormContainer from "../layout/FormContainer";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .required("It is required to proceed")
          .email("Wrong email format")
      })}
      onSubmit={values => dispatch(forgotPassword(values))}
    >
      <FormContainer>
        <Field component={Input} name="email" label="Your email" />
        <Button color="teal">Request new password</Button>
      </FormContainer>
    </Formik>
  );
};

export default ForgotPassword;
