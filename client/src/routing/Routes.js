import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Footer from "../layout/Footer";
import Header from "../layout/Header/index";
import Container from "../layout/Container";
import Message from "../shared/Message";

import GuestRoute from "./GuestRoute";
import PrivateRoute from "./PrivateRoute";

import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PostDetail from "../pages/PostDetail";
import AddEditPost from "../pages/AddEditPost";
import Verification from "../pages/Verification";
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";
import Profile from "../pages/Profile";

export default () => {
  const message = useSelector(({ auth: { message } }) => message);

  // call rerender if message arrives
  useEffect(() => {}, [message]);

  return (
    <>
      <Header />
      <Container>{message && <Message message={message} />}</Container>
      <div className="content">
        <Switch>
          <Route exact path="/" component={Home} />
          <GuestRoute path="/login" component={Login} />
          <GuestRoute path="/register" component={Register} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute
            exact
            path="/posts/add"
            component={AddEditPost}
            propsForComponent={{ editMode: false }}
          />
          <Route exact path="/posts/:id" component={PostDetail} />
          <PrivateRoute
            path="/posts/:id/edit"
            component={AddEditPost}
            propsForComponent={{ editMode: true }}
          />
          <Route path="/forgot_password" component={ForgotPassword} />
          <Route path="/verification" component={Verification} />
          <Route path="/reset_password" component={ResetPassword} />
        </Switch>
      </div>
      <Footer />
    </>
  );
};
