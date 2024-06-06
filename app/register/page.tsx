"use client";

import { useFormState } from "react-dom";

import { createUser } from "../actions";

import Input from "@/components/Input";
import Alert from "@/components/Alert";
import Button from "@/components/Button";

const RegisterPage = () => {
  const [state, formAction] = useFormState(createUser, {
    error: null,
  });

  return (
    <div>
      <h1 className="text-2xl text-center mb-10">Join the community</h1>
      <form
        action={formAction}
        className="mx-auto lg:max-w-2xl flex flex-col gap-4"
      >
        {state.error && <Alert type="error">{state.error}</Alert>}
        <Input name="name" placeholder="Name" />
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />
        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
