import { createBrowserRouter, Outlet } from "react-router-dom";
import { lazy } from "react";

import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Home = lazy(() => import("../pages/Home"));

const Register = lazy(() => import("auth/RegisterPage"));
const Login = lazy(() => import("auth/LoginPage"));
const Verification = lazy(() => import("auth/VerificationPage"));
const ResetPassword = lazy(() => import("auth/ResetPasswordPage"));
const ForgotPassword = lazy(() => import("auth/ForgotPasswordPage"));
const Profile = lazy(() => import("auth/ProfilePage"));

const AddPostPage = lazy(() => import("posts/AddPostPage"));
const PostDetail = lazy(() => import("posts/PostDetail"));

const NotFound = lazy(() => import("pages/NotFound"));

const Layout = () => (
  <>
    <Header />
    <main className="container py-10 flex-1">
      <Outlet />
    </main>
    <Footer />
  </>
);

// TODO: handle auth routes

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "profile", element: <Profile /> },
      { path: "posts/create", element: <AddPostPage /> },
      { path: "posts/:id/edit", element: <AddPostPage /> },
      { path: "forgot_password", element: <ForgotPassword /> },
      { path: "posts/:slug/:id", element: <PostDetail /> },
      { path: "verification", element: <Verification /> },
      { path: "reset_password", element: <ResetPassword /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
