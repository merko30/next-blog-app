import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AddEditPost from "../pages/AddEditPost";
import PostDetail from "../pages/PostDetail";
import Verification from "../pages/Verification";
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import Landing from "../pages/Landing";

import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Layout = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

// TODO: handle auth routes

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/posts", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/profile", element: <Profile /> },
      { path: "/posts/add", element: <AddEditPost /> },
      { path: "/posts/:id/edit", element: <AddEditPost /> },
      { path: "/forgot_password", element: <ForgotPassword /> },
      { path: "/posts/:slug", element: <PostDetail /> },
      { path: "/verification", element: <Verification /> },
      { path: "/reset_password", element: <ResetPassword /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
