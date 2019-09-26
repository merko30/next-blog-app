import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import Textarea from "../../shared/Textarea";
import Button from "../../shared/Button";

const validationSchema = Yup.object().shape({
  comment: Yup.string()
    .required("Comment is required field")
    .min(12, "Comment should have at least 12 characters")
});

export default ({ onSubmit, postID, editMode, comment, cancelEditMode }) => {
  return (
    <>
      <Formik
        initialValues={{ comment: editMode ? comment.comment : "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (!editMode) {
            onSubmit(postID, values);
            setSubmitting(false);
            resetForm();
          } else {
            onSubmit(postID, comment._id, values);
            cancelEditMode(true);
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <Field
                name="comment"
                component={Textarea}
                placeholder="Your comment"
                rows={3}
              />
              <Button
                color="blue"
                block={false}
                type="submit"
                disabled={isSubmitting}
              >
                Add comment
              </Button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
