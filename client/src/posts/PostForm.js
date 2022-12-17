import React from "react";
import { Field, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

import Input from "../shared/Input";
import Button from "../shared/Button";
import Error from "../shared/Error";
import Textarea from "../shared/Textarea";
import FileInput from "../shared/FileInput";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required field")
    .min(10, "Title should have at least 10 characters"),
  body: Yup.string()
    .required("Content is required field")
    .min(150, "Content should have at least 150 characters"),
});

const PostForm = ({ onSubmit, error, editMode, post, ...props }) => {
  const formik = useFormik({
    initialValues: {},
    validationSchema,
  });

  const { setFieldValue, isSubmitting, handleSubmit } = formik;

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit} className="w-full md:w-1/2 mx-auto">
        {error && <Error error={error} />}
        <Field name="title" component={Input} label="Title" />
        <Field name="body" component={Textarea} label="Content" rows={8} />
        <Button
          color="yellow"
          classes="my-2"
          block={false}
          onClick={() => console.log("change")}
        >
          Change image
        </Button>
        <FileInput
          setFieldValue={setFieldValue}
          name="image"
          allowedTypes={["image/jpg", "image/jpeg", "image/png"]}
          allowedSize={5 * 1024 * 1024}
        />
        <Button color="green" type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </FormikProvider>
  );
};

export default PostForm;
