import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import Input from "../shared/Input";
import Button from "../shared/Button";
import Error from "../shared/Error";
import Textarea from "../shared/Textarea";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required field")
    .min(10, "Title should have at least 10 characters"),
  body: Yup.string()
    .required("Content is required field")
    .min(150, "Content should have at least 150 characters")
});

export default ({ onSubmit, error, ...props }) => {
  console.log(props);
  return (
    <>
      <Formik
        initialValues={{ title: "", body: "" }}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values);
          setSubmitting(false);
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form className="p-4 mx-auto w-full md:w-1/3">
            {error && <Error error={error} />}
            <Field name="title" component={Input} label="Title" />
            <Field name="body" component={Textarea} label="Content" rows={8} />
            <Button color="green" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
