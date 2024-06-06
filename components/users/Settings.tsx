"use client";
import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";
import { User } from "@prisma/client";

import Input from "../Input";
import Textarea from "../Textarea";

interface SettingsProps {
  user: Partial<User>;
}

const BLACKLIST = ["emailVerified", "id"];

const Settings = ({ user }: SettingsProps) => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Record<string, string>>(
    Object.entries(user).reduce((acc: Record<string, string>, [key, value]) => {
      if (!BLACKLIST.includes(key)) {
        acc[key] = value?.toString() ?? "";
      }

      return acc;
    }, {})
  );

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${user.id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();

      console.log(json);
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-center w-full">
        <div className="w-full">
          <Input
            name="firstName"
            value={data.firstName}
            onChange={onChange}
            label="First name"
            className="px-4 py-3 mb-4"
          />
          <Input
            name="lastName"
            value={data.lastName}
            onChange={onChange}
            label="Last name"
            className="px-4 py-3 mb-4"
          />
        </div>
      </div>
      <Input
        name="shortDescription"
        value={data.shortDescription}
        onChange={onChange}
        label="Short description"
        className="px-4 py-3 mb-4"
      />
      <Textarea
        name="description"
        value={data.description}
        onChange={onChange}
        label="Description"
        className="px-4 py-3 mb-4"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default Settings;
