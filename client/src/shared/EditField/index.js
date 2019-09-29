import React, { useState } from "react";
import { Formik, Field, Form } from "formik";

import Input from "../Input";
import Button from "../Button";

import createSchema from "./createSchema";
import capitalize from "../../utils/capitalize";
import Message from "../Message";
import Error from "../Error";

const EditField = ({
  field,
  confirmation,
  onSubmit,
  validations,
  error,
  message
}) => {
  const [editMode, setEditMode] = useState(false);
  const confirmField = confirmation
    ? { [`confirm${capitalize(field)}`]: "" }
    : null;
  const schema = createSchema(field, validations, confirmation);
  if (editMode) {
    return (
      <Formik
        validationSchema={schema}
        enableReinitialize={true}
        initialValues={{ [field]: "", ...confirmField }}
        onSubmit={(values, { resetForm }) => {
          onSubmit(field, values);
          resetForm();
        }}
      >
        <Form className="my-2">
          {error && <Error error={error} />}
          {message && <Message color="green" message={message} />}
          <Field component={Input} name={field} label={`Your new ${field}`} />
          {confirmation && (
            <Field
              component={Input}
              name={`confirm${capitalize(field)}`}
              label={`Confirm your ${field}`}
            />
          )}
          <Button block={false}>Edit</Button>
          <Button
            block={false}
            onClick={() => setEditMode(false)}
            color="red"
            classes="mx-2"
          >
            Cancel edit
          </Button>
        </Form>
      </Formik>
    );
  } else {
    return (
      <div
        className="border-b-2 py-3 mt-4 cursor-pointer"
        onClick={() => setEditMode(true)}
      >
        <h3>Update your {field}</h3>
      </div>
    );
  }
};

export default EditField;
