import React, { useState } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import Input from "../../shared/Input";
import Button from "../../shared/Button";
import Error from "../../shared/Error";
import AvatarCropper from "../../shared/AvatarCropper";
import AvatarInput from "../../shared/AvatarInput";

import Modal from "../../shared/Modal";
import FormContainer from "../../layout/FormContainer";

const validationSchema = Yup.object().shape({
  name: Yup.string(),
  username: Yup.string()
    .required("Username is required field")
    .min(8, "Name should be longer than 8 characters"),
  email: Yup.string("Email is required field")
    .required("Email is required field")
    .email("Wrong email format"),
  password: Yup.string()
    .required("Password is required field")
    .min(8, "Password should be longer than 8 characters")
});

const RegisterForm = ({ onSubmit, error }) => {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState("");
  const [src, setSrc] = useState("");

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          username: "",
          email: "",
          password: "",
          avatar: {}
        }}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values);
          setSubmitting(false);
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, setFieldValue }) => (
          <FormContainer>
            {error && <Error error={error} />}
            <AvatarInput
              image={image}
              setImageSource={s => setSrc(s)}
              openModal={setShow}
            />
            <Modal show={show} onClose={() => setShow(false)}>
              <AvatarCropper
                src={src}
                getImage={img => setImage(img)}
                setFieldValue={setFieldValue}
              />
            </Modal>
            <Field name="name" component={Input} label="Name" />
            <Field name="username" component={Input} label="Username" />
            <Field name="email" component={Input} label="Email" />
            <Field
              name="password"
              type="password"
              component={Input}
              label="Password"
            />
            <Button color="green" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </FormContainer>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
