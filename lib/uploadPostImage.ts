import slugify from "@/utils/slugify";

/**
 * Uploads an image for a post, using different logic depending on the environment.
 * - In production, uses supabase upload.
 * - In development, uses s3client upload.
 *
 * @param imageFile The image file to upload
 * @param title The post title (for slugifying the file name)
 * @param folder The folder to upload to (default: 'posts')
 * @returns The uploaded file path or null
 */
export async function uploadPostImage(
  imageFile: File | null,
  title: string,
  folder: string = "posts"
) {
  if (!imageFile) return null;
  const isProduction = process.env.NODE_ENV === "production";
  if (isProduction) {
    const { uploadImage } = await import("@/lib/supabase");
    const fileName = await uploadImage(imageFile, slugify(title), folder);
    return fileName ?? null;
  } else {
    const { uploadImage } = await import("@/lib/s3client");
    const fileName = await uploadImage(imageFile, slugify(title), folder);
    return fileName ?? null;
  }
}
