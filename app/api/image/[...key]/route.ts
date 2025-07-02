// app/api/image/[key]/route.ts

import { NextResponse, NextRequest } from "next/server";
import { getEnv } from "@/lib/env";
const isProduction = process.env.NODE_ENV === "production";

export async function GET(req: NextRequest, context: any) {
  const { params } = context;
  const key = Array.isArray(params.key) ? params.key.join("/") : params.key;

  if (!isProduction) {
    // Load from Supabase Storage (public bucket)
    try {
      // You may want to move this logic to a shared util if used elsewhere
      const { createClient } = await import("@supabase/supabase-js");
      const supabaseUrl = getEnv("SUPABASE_URL");
      const supabaseKey = getEnv("SUPABASE_SERVICE_ROLE_KEY");
      const supabase = createClient(supabaseUrl, supabaseKey);
      // Adjust bucket name if needed
      const { data, error } = await supabase.storage
        .from(getEnv("S3_BUCKET")) // Use the bucket name from environment variables or default to 'images'
        .download(key);
      if (error || !data) {
        return new NextResponse("Image not found", { status: 404 });
      }
      // data is a Blob
      const headers = new Headers();
      headers.set("Content-Type", data.type || "application/octet-stream");
      headers.set("Content-Length", data.size.toString());
      return new NextResponse(data.stream(), { headers });
    } catch (error) {
      console.error("Error fetching image from Supabase:", error);
      return new NextResponse("Failed to fetch image", { status: 500 });
    }
  } else {
    // Load from S3
    try {
      const { GetObjectCommand } = await import("@aws-sdk/client-s3");
      const { createS3Client } = await import("@/lib/s3client");
      const s3Client = createS3Client();
      const command = new GetObjectCommand({
        Bucket: getEnv("S3_BUCKET"),
        Key: key,
      });
      const response = await s3Client.send(command);
      if (!response.Body) {
        return new NextResponse("Image not found", { status: 404 });
      }
      const bodyStream = response.Body as
        | ReadableStream
        | NodeJS.ReadableStream;
      const headers = new Headers();
      if (response.ContentType) {
        headers.set("Content-Type", response.ContentType);
      }
      if (response.ContentLength) {
        headers.set("Content-Length", response.ContentLength.toString());
      }
      if (response.ETag) {
        headers.set("ETag", response.ETag);
      }
      return new NextResponse(bodyStream as ReadableStream, { headers });
    } catch (error) {
      console.error("Error fetching image from S3:", error);
      return new NextResponse("Failed to fetch image", { status: 500 });
    }
  }
}
