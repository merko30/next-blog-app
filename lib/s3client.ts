import {
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

import {
  S3_ENDPOINT,
  S3_ACCESS_KEY,
  S3_SECRET_ACCESS_KEY,
  S3_BUCKET,
} from "./env";

export const createS3Client = () => {
  const s3Client = new S3Client({
    region: "central",
    endpoint: S3_ENDPOINT,
    credentials: {
      accessKeyId: S3_ACCESS_KEY,
      secretAccessKey: S3_SECRET_ACCESS_KEY,
    },
  });

  return s3Client;
};

export const uploadImage = async (
  file: File,
  slug: string,
  prefix?: string
) => {
  const s3Client = createS3Client();

  const fileName = `${prefix ? `/${prefix}` : ""}/${slug}.${
    file.name.split(".").slice(-1)[0]
  }`;

  const params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Body: Buffer.from(await file.arrayBuffer()),
    ContentType: file.type,
    ACL: ObjectCannedACL.public_read,
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
    return fileName;
  } catch (error) {
    console.error("Error uploading the image:", error);
  }
};
