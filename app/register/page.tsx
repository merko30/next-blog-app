"use client";

import { useActionState } from "react";

import Link from "next/link";

import { createUser } from "../actions";

import Input from "@/components/Input";
import Alert from "@/components/Alert";
import Button from "@/components/Button";

const RegisterPage = () => {
  const [state, formAction] = useActionState(createUser, {
    error: null,
    data: {},
  });

  return (
    <div className="relative">
      <h1 className="text-3xl font-semibold text-center mb-10">
        Join the community
      </h1>
      <form
        action={formAction}
        className="mx-auto lg:max-w-2xl flex flex-col gap-4"
      >
        {state.error && <Alert type="error">{state.error}</Alert>}
        <Input
          name="username"
          placeholder="Name"
          error={state.errors?.username}
          defaultValue={String(state.data?.username ?? "")}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          error={state.errors?.email}
          defaultValue={String(state.data?.email ?? "")}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          error={state.errors?.password}
          defaultValue={String(state.data?.password ?? "")}
        />
        <Button type="submit">Sign up</Button>
        <Link href="/login" className="text-sm text-gray-700 text-center">
          Already have an account? Sign In
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;
