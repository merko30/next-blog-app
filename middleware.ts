export { default } from "next-auth/middleware";

// starts with profile
export const config = { matcher: [
    "/profile",
    "/profile/:path*",
    "/create/:path*"
] };
