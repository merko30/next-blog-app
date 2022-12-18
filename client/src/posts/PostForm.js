import { Field, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

import Input from "shared/Input";
import Button from "shared/Button";
import Error from "shared/Error";
import Textarea from "shared/Textarea";
import FileInput from "shared/FileInput";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(10, "Title should have at least 10 characters"),
  body: Yup.string()
    .required("Content is required")
    .min(150, "Content should have at least 150 characters"),
});

const PostForm = ({ onSubmit, post, error }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
      image: null,
    },
    validationSchema,
    validate: (values) => {
      const errors = {};
      if (!values.image) {
        errors["image"] = "Please select an image";
      }

      return errors;
    },
    onSubmit,
  });

  const { setFieldValue, isSubmitting, handleSubmit } = formik;

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit} className="w-full md:w-1/2 mx-auto">
        {error && <Error error={error} />}
        <Field name="title" component={Input} label="Title" />
        <Field name="body" component={Textarea} label="Content" rows={8} />
        <FileInput
          name="image"
          onChange={(value) => setFieldValue("image", value)}
          error={formik.errors.image}
        />
        <Button color="green" type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </FormikProvider>
  );
};

export default PostForm;
