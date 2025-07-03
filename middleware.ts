export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/profile", "/profile/:path*", "/create/:path*", "/posts/:id/edit"],
};
