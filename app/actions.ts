"use server";

import { getEnv } from "@/lib/env";
import transformFormData from "@/utils/transformFormData";
import { redirect } from "next/navigation";

import { z } from "zod";

const schema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});

export const createUser = async (prevState: any, formData: FormData) => {
  const data = transformFormData(formData, ["username", "email", "password"]);

  const validationResult = schema.safeParse(data);

  const errors = Object.entries(
    validationResult.error?.flatten().fieldErrors ?? {}
  ).reduce((errors: Record<string, string>, [name, errorsArray]) => {
    errors[name] = errorsArray[0];

    return errors;
  }, {});

  if (Object.keys(errors).length) {
    return {
      errors,
      data,
    };
  }

  const response = await fetch(
    `${getEnv("NEXT_PUBLIC_API_URL")}/users/register`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const json = await response.json();

  console.log(json);

  if (!json.error) {
    redirect("/login");
  }

  return { error: json.error, data };
};
