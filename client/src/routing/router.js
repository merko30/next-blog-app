import { createBrowserRouter, Outlet } from "react-router-dom";

import Home from "../pages/Home";

import Register from "auth/RegisterPage";
import Login from "auth/LoginPage";
import Verification from "auth/VerificationPage";
import ResetPassword from "auth/ResetPasswordPage";
import ForgotPassword from "auth/ForgotPasswordPage";
import Profile from "auth/ProfilePage";

import AddPostPage from "posts/AddPostPage";
import PostDetail from "posts/PostDetail";

import NotFound from "../pages/NotFound";

import Header from "../layout/Header";
import Footer from "../layout/Footer";

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
