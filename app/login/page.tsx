"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChangeEventHandler, FormEvent, useState } from "react";

import Input from "@/components/Input";
import Alert from "@/components/Alert";
import Button from "@/components/Button";

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await signIn("credentials", { redirect: false, ...data });

    if (response?.error) {
      setError(response.error);
    } else {
      router.push("/");
    }
  };

  const onChange: ChangeEventHandler<HTMLInputElement> | undefined = (e) =>
    setData((old) => ({ ...old, [e.target.name]: e.target.value }));

  return (
    <div>
      <h1 className="mb-10 text-2xl text-center text-primary-darkest">
        Welcome back
      </h1>
      <form onSubmit={login} className="w-full flex flex-col gap-4">
        {error && <Alert type="error">{error}</Alert>}
        <Input
          value={data.email}
          onChange={onChange}
          name="email"
          placeholder="Email"
          type="email"
        />
        <Input
          value={data.password}
          onChange={onChange}
          name="password"
          placeholder="Password"
          type="password"
        />
        <Button type="submit">Sign in</Button>
        <Link href="/register" className="text-sm text-gray-700 text-center">
          Don't have an account? Sign up
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
