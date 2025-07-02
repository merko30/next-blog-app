import { createClient } from "@supabase/supabase-js";
import { getEnv } from "./env";

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {}
);

export const uploadImage = async (
  file: File,
  slug: string,
  prefix?: string
) => {
  const fileExtension = file.name.split(".").pop();
  const fileName = `${prefix ? `${prefix}/` : ""}${slug}.${fileExtension}`;

  console.log(fileName);

  const { data, error } = await supabase.storage
    .from(
      getEnv("S3_BUCKET") || "images" // Use the bucket name from environment variables or default to 'images'
    )
    .upload(fileName, file, {
      cacheControl: "3600",
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    console.log("Error uploading the image:", JSON.stringify(error));
    return null;
  }

  return data?.path || null;
};
