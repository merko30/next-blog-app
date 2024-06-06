"use server";

import transformFormData from "@/utils/transformFormData";
import { redirect } from "next/navigation";

export const createUser = async (prevState: any, formData: FormData) => {
  const data = transformFormData(formData, ["name", "email", "password"]);

  const response = await fetch("http://localhost:3000/api/users/register", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();

  if (!json.error) {
    redirect("/login");
  }

  return { error: json.error };
};
