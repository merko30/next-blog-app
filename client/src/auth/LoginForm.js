import { Link } from "react-router-dom";
import { Field, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";

import Input from "shared/Input";
import Button from "shared/Button";

const validationSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required("This field is required"),
  password: Yup.string().required("Password is required field"),
});

const Login = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: { usernameOrEmail: "mason@gmail.com", password: "password" },
    onSubmit: (values, { setSubmitting }) => {
      onSubmit(values);
      setSubmitting(false);
    },
    validationSchema,
  });

  const { isSubmitting, handleSubmit } = formik;

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit}>
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
      </form>
    </FormikProvider>
  );
};

export default Login;
