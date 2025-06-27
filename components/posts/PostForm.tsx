"use client";

import { useActionState, useState } from "react";
import { Post } from "@prisma/client";
import dynamic from "next/dynamic";

import Input from "../Input";
import Button from "../Button";
import { createPostAction } from "@/app/create/action";
import SaveButton from "../users/SaveButton";

const TextEditor = dynamic(() => import("../TextEditor"), {
  loading: () => <div className="h-72 bg-gray-50 animate-pulse" />,
  ssr: false,
});
interface PostFormProps {
  post?: Post;
  type?: "create" | "edit";
}

const PostForm = ({ type = "create", post }: PostFormProps) => {
  const initialState = {
    data: {
      title: post?.title ?? "",
      content: post?.content ?? "",
    },
    error: undefined,
    errors: {},
  };

  const [state, formAction] = useActionState(createPostAction, initialState);
  const [content, setContent] = useState(post?.content ?? "");

  return (
    <form action={formAction} className="w-full flex flex-col gap-4">
      <Input
        name="title"
        defaultValue={String(state.data.title ?? "")}
        error={state.errors?.title}
      />
      <TextEditor
        value={content}
        onChange={(newContent) => setContent(newContent)}
      />
      {state.errors?.content && (
        <p className="text-red-600 text-sm mt-0.5">{state.errors?.content}</p>
      )}

      {/* Hidden input to pass content */}
      <input type="hidden" name="content" value={content} />

      <Input type="file" name="image" />
      <SaveButton>Save</SaveButton>
    </form>
  );
};

export default PostForm;
