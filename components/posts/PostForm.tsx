"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useSession } from "next-auth/react";

import Input from "../Input";
import Button from "../Button";

import { getEnv } from "@/lib/env";
import dynamic from "next/dynamic";

const TextEditor = dynamic(() => import("../TextEditor"), {
  loading: () => <div className="h-72 bg-gray-50 animate-pulse" />,
  ssr: false,
});
interface PostFormProps {
  post?: Post;
  type?: "create" | "edit";
}

const PostForm = ({ type = "create", post }: PostFormProps) => {
  const [data, setData] = useState(
    post ?? { title: "", content: "", image: "" }
  );

  const router = useRouter();

  const { data: session } = useSession();

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, content, image } = data;

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image!);

    const isEditMode = type === "edit" && post;

    console.log(getEnv("NEXT_PUBLIC_API_URL"));

    try {
      const response = await fetch(
        `${getEnv("NEXT_PUBLIC_API_URL")}/posts${
          isEditMode ? `/${post!.id}` : ""
        }`,
        {
          method: isEditMode ? "PUT" : "POST",
          body: formData,
        }
      );

      console.log(response);

      const json = await response.json();
      console.log(json);

      const id = json.post.id;

      router.push(`/posts/${id}`);
      // revalidatePath(`/posts/${id}`);
    } catch (error) {
      console.log(error);

      return { error: "Something went wrong" };
    }
  };

  const onChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    console.log(event);

    const {
      target: { name, value },
    } = event;
    setData((old) => ({
      ...old,
      [name]:
        name === "image" ? (event.target as HTMLInputElement).files![0] : value,
    }));
  };

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
      <Input name="title" value={data.title} onChange={onChange} />
      <TextEditor
        value={data.content}
        onChange={(content) => setData((old) => ({ ...old, content }))}
      />
      <Input
        type="file"
        name="image"
        //value={data.image ?? ""}
        onChange={onChange}
      />
      <Button type="submit">Save post</Button>
    </form>
  );
};

export default PostForm;
