import { Field, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";

import Input from "shared/Input";
import Button from "shared/Button";

const validationSchema = Yup.object().shape({
  name: Yup.string(),
  username: Yup.string()
    .required("Username is required field")
    .min(6, "Username should be longer than 6 characters"),
  email: Yup.string("Email is required field")
    .required("Email is required field")
    .email("Wrong email format"),
  password: Yup.string()
    .required("Password is required field")
    .min(8, "Password should be longer than 8 characters"),
});

const RegisterForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: "masonmount",
      email: "mason@gmail.com",
      password: "password",
    },
    onSubmit: (values, { setSubmitting }) => {
      onSubmit(values);
      setSubmitting(false);
    },
    validationSchema: validationSchema,
  });

  const { isSubmitting, handleSubmit } = formik;

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit}>
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
      </form>
    </FormikProvider>
  );
};

export default RegisterForm;
