// app/api/image/[key]/route.ts
import { NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getEnv } from "@/lib/env"; // your server-only env helper
import { createS3Client } from "@/lib/s3client";

const s3Client = createS3Client();

export async function GET(
  req: Request,
  { params }: { params: { key: string[] } }
) {
  const key = params.key.join("/"); // support nested keys like ['folder', 'image.jpg']

  try {
    const command = new GetObjectCommand({
      Bucket: getEnv("S3_BUCKET"),
      Key: key,
    });

    const response = await s3Client.send(command);

    console.log(response);

    if (!response.Body) {
      return new NextResponse("Image not found", { status: 404 });
    }

    // response.Body is a ReadableStream (Node 18+) or stream.Readable
    const bodyStream = response.Body as ReadableStream | NodeJS.ReadableStream;

    // Pass through headers like content-type for the browser
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
    console.error("Error fetching image:", error);
    return new NextResponse("Failed to fetch image", { status: 500 });
  }
}
