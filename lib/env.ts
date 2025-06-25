function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const S3_ENDPOINT = getEnv("S3_ENDPOINT");
export const S3_BUCKET = getEnv("S3_BUCKET");
export const S3_ACCESS_KEY = getEnv("S3_ACCESS_KEY");
export const S3_SECRET_ACCESS_KEY = getEnv("S3_SECRET_ACCESS_KEY");

export const API_URL = getEnv("NEXT_PUBLIC_API_URL");
