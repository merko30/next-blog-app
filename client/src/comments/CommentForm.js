import { Field, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";

import Textarea from "shared/Textarea";
import Button from "shared/Button";

const validationSchema = Yup.object().shape({
  comment: Yup.string()
    .required("Please, enter your comment")
    .min(12, "Comment should have at least 12 characters"),
});

const CommentForm = ({ onSubmit, comment, onCancel }) => {
  const formik = useFormik({
    initialValues: {
      comment: comment ? comment?.comment : "",
    },
    enableReinitialize: false,
    validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      onSubmit(values);
      resetForm();
      setSubmitting(false);
    },
  });

  const { isSubmitting, handleSubmit } = formik;

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit}>
        <Field
          name="comment"
          component={Textarea}
          placeholder="Your comment"
          rows={3}
        />
        <Button type="submit" disabled={isSubmitting} color="blue">
          {comment ? "Edit comment" : "Add comment"}
        </Button>
        {comment && (
          <Button type="button" onClick={onCancel} classes="mx-2" color="red">
            Cancel edit
          </Button>
        )}
      </form>
    </FormikProvider>
  );
};

export default CommentForm;
