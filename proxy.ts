import middleware from "next-auth/middleware";

export default middleware;

export const config = {
  matcher: ["/profile", "/profile/:path*", "/create/:path*", "/posts/:id/edit"],
};
