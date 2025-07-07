"use server";

import { getServerSession } from "next-auth";
import { z } from "zod";

import prisma from "@/prisma";

import authOptions from "@/lib/authOptions";
import transformFormData from "@/utils/transformFormData";
import { revalidatePath } from "next/cache";

const optionalTrimmedString = (min?: number, max?: number, label?: string) =>
  z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .refine((val) => val === undefined || typeof val === "string", {
      message: `${label ?? "Field"} must be a string`,
    })
    .refine((val) => val === undefined || (min ? val.length >= min : true), {
      message: `${label ?? "Field"} must be at least ${min} characters`,
    })
    .refine((val) => val === undefined || (max ? val.length <= max : true), {
      message: `${label ?? "Field"} must be at most ${max} characters`,
    })
    .optional();

const schema = z.object({
  firstName: optionalTrimmedString(3, 20, "First name"),
  lastName: optionalTrimmedString(3, 20, "Last name"),
  shortDescription: optionalTrimmedString(undefined, 100, "Short description"),
  description: z.string().optional(),
});

export const updateUserAction = async (prevState: any, formData: FormData) => {
  const data = transformFormData(formData, [
    "firstName",
    "lastName",
    "shortDescription",
    "description",
  ]);

  const validationResult = schema.safeParse(data);

  const errors = Object.entries(
    validationResult.error?.flatten().fieldErrors ?? {}
  ).reduce((errors: Record<string, string>, [name, errorsArray]) => {
    errors[name] = errorsArray[0];

    return errors;
  }, {});

  console.log("errors", errors);

  if (Object.keys(errors).length) {
    return {
      data,
      errors,
    };
  }

  try {
    const session = await getServerSession(authOptions);

    const user = await prisma?.user.update({
      where: {
        id: session?.user!.id,
      },
      data,
    });

    console.log(user);

    revalidatePath("/profile/settings");

    return {
      data,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Failed to update user information",
      error: JSON.stringify(error, null, 2),
      data,
    };
  }
};
