/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Set the body size limit for server actions
    },
  },
};

export default nextConfig;
