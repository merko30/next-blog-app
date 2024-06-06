"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

import Input from "../Input";
import Textarea from "../Textarea";
import { useSession } from "next-auth/react";
import Button from "../Button";

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

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, content, image } = data;

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image!);
    formData.append("authorId", session!.user!.id);

    const isEditMode = type === "edit" && post;
    try {
      const response = await fetch(
        `http://localhost:3000/api/posts${isEditMode ? `/${post!.id}` : ""}`,
        {
          method: isEditMode ? "PUT" : "POST",
          body: formData,
        }
      );

      const json = await response.json();

      const id = json.post.id;

      router.push(`/posts/${id}`);
      revalidatePath(`/posts/${id}`);
    } catch (error) {
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
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Input name="title" value={data.title} onChange={onChange} />
      <Textarea
        name="content"
        value={data.content}
        onChange={onChange}
        rows={6}
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
