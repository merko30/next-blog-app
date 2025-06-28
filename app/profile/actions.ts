"use server";

import { getServerSession } from "next-auth";
import { z } from "zod";

import authOptions from "@/lib/authOptions";
import transformFormData from "@/utils/transformFormData";
import { revalidatePath } from "next/cache";

const schema = z.object({
  firstName: z
    .string()
    .min(3, "First name must be at least 3 characters")
    .max(20, "First name must be at most 20 characters"),
  lastName: z
    .string()
    .min(3, "Last name must be at least 3 characters")
    .max(20, "Last name must be at most 20 characters"),
  shortDescription: z
    .string()
    .max(100, "Short description must be at most 100 characters"),
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

    revalidatePath("/profile/settings");

    return {
      data,
    };
  } catch (error) {
    return {
      error: "Failed to update user information",
      data,
    };
  }
};
