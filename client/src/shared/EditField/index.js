import React, { useState } from "react";
import { Formik, Field, Form } from "formik";

import Input from "../Input";
import Button from "../Button";

import createSchema from "./createSchema";
import capitalize from "../utils/capitalize";

const EditField = ({
  field,
  confirmation = false,
  onSubmit,
  validations = {},
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
          setEditMode(false);
        }}
      >
        <Form className="my-2 mx-4">
          <Field component={Input} name={field} label={`Your new ${field}`} />
          {confirmation && (
            <Field
              component={Input}
              name={`confirm${capitalize(field)}`}
              label={`Confirm your ${field}`}
            />
          )}
          <Button>Save</Button>
          <Button onClick={() => setEditMode(false)} color="red" classes="mx-2">
            Cancel edit
          </Button>
        </Form>
      </Formik>
    );
  } else {
    return (
      <div
        className="px-4 py-2 cursor-pointer update"
        onClick={() => setEditMode(true)}
      >
        <h3 className="border-b-2 border-orange-300 py-2">
          Update your {field}
        </h3>
      </div>
    );
  }
};

export default EditField;
