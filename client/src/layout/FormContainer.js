import React from "react";
import { Form } from "formik";

const FormContainer = ({ children }) => (
  <Form className="p-4 mx-auto w-full md:w-3/4 lg:w-2/3">{children}</Form>
);

export default FormContainer;
