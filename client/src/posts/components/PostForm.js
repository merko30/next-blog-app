import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import history from "../../config/history";

import Input from "../../shared/Input";
import Button from "../../shared/Button";
import Error from "../../shared/Error";
import Textarea from "../../shared/Textarea";
import FileInput from "../../shared/FileInput";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required field")
    .min(10, "Title should have at least 10 characters"),
  body: Yup.string()
    .required("Content is required field")
    .min(150, "Content should have at least 150 characters")
});

export default ({ onSubmit, error, editMode, post }) => {
  return (
    <>
      <Formik
        initialValues={
          editMode
            ? { title: post.title, body: post.body }
            : { title: "", body: "", image: {} }
        }
        onSubmit={(values, { setSubmitting }) => {
          if (!editMode) {
            console.log(values);
            onSubmit(values);
            setSubmitting(false);
          } else {
            onSubmit(post._id, values);
            setSubmitting(false);
          }
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="p-4 mx-auto w-full md:w-3/4 lg:w-2/3">
            {error && <Error error={error} />}
            <Field name="title" component={Input} label="Title" />
            <Field name="body" component={Textarea} label="Content" rows={8} />
            <FileInput
              setFieldValue={setFieldValue}
              name="image"
              allowedTypes={["image/jpg", "image/jpeg", "image/png"]}
              allowedSize={2400000}
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
