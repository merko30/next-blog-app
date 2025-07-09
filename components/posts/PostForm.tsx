"use client";

import { useActionState, useState } from "react";
import { Category, Post } from "@prisma/client";
import dynamic from "next/dynamic";

import Input from "../Input";
import SaveButton from "../users/SaveButton";
import CategorySelect from "./CategorySelect";

const TextEditor = dynamic(() => import("../TextEditor"), {
  loading: () => <div className="h-72 bg-gray-50 animate-pulse" />,
  ssr: false,
});
interface PostFormProps {
  post?: Post & {
    category: Category;
  };
  action: (prevState: any, formData: FormData) => Promise<any>;
}

const PostForm = ({ action, post }: PostFormProps) => {
  const initialState = {
    data: {
      title: post?.title ?? "",
      categoryId: post?.categoryId ?? null,
      content: post?.content ?? "",
    },
    error: undefined,
    errors: {},
  };

  console.log(post);

  const [state, formAction] = useActionState(action, initialState);
  const [content, setContent] = useState(post?.content ?? "");
  const [category, setCategory] = useState<Category | null>(
    post?.category ?? null
  );

  return (
    <form action={formAction} className="w-full flex flex-col gap-4">
      {post && <input readOnly hidden value={post.id} name="id" />}
      <Input
        name="title"
        defaultValue={String(state.data.title ?? "")}
        placeholder="Title"
        error={state.errors?.title}
      />
      <TextEditor
        value={content}
        onChange={(newContent) => setContent(newContent)}
      />
      {state.errors?.content && (
        <p className="text-red-600 text-sm mt-0.5">{state.errors?.content}</p>
      )}

      <CategorySelect category={category} onChange={setCategory} />

      {state.errors.categoryId && (
        <p className="text-red-600 text-sm mt-0.5">
          {state.errors?.categoryId}
        </p>
      )}
      <input
        type="hidden"
        readOnly
        name="categoryId"
        value={category?.id ?? ""}
      />

      {/* Hidden input to pass content */}
      <input type="hidden" name="content" value={content} />

      <Input type="file" name="image" />
      <SaveButton>Save</SaveButton>
    </form>
  );
};

export default PostForm;
