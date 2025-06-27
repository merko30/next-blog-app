"use client";

import { useFormStatus } from "react-dom";
import Button from "../Button";

const SaveButton = ({ children }: { children: React.ReactNode }) => {
  const { pending } = useFormStatus();

  return <Button type="submit">{pending ? "Saving..." : children}</Button>;
};

export default SaveButton;
