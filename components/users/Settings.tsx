"use client";
import { User } from "@prisma/client";

import Input from "../Input";
import Textarea from "../Textarea";

import { updateUserAction } from "@/app/profile/actions";
import { useActionState } from "react";
import SaveButton from "./SaveButton";

interface SettingsProps {
  user: Partial<User>;
}

const Settings = ({ user }: SettingsProps) => {
  const initialState = {
    data: {
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      shortDescription: user.shortDescription ?? "",
      description: user.description ?? "",
    },
    error: undefined,
    errors: {},
  };
  const [state, formAction] = useActionState(updateUserAction, initialState);
  return (
    <form action={formAction}>
      <div className="flex items-center w-full">
        <div className="w-full">
          <Input
            name="firstName"
            defaultValue={String(state?.data.firstName ?? "")}
            label="First name"
            className="px-4 py-3 mb-4"
          />
          <Input
            name="lastName"
            defaultValue={String(state?.data.lastName ?? "")}
            label="Last name"
            className="px-4 py-3 mb-4"
          />
        </div>
      </div>
      <Input
        name="shortDescription"
        defaultValue={String(state?.data.shortDescription ?? "")}
        label="Short description"
        className="px-4 py-3 mb-4"
      />
      <Textarea
        name="description"
        defaultValue={String(state?.data.description ?? "")}
        label="Description"
        className="px-4 py-3 mb-4"
      />
      <SaveButton>Save</SaveButton>
    </form>
  );
};

export default Settings;
