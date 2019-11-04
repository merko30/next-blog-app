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
import NotFound from "../pages/NotFound";
import Landing from "../pages/Landing";

export default () => {
  const { warning, loggedIn } = useSelector(({ auth }) => auth);

  // call rerender if warning arrives
  useEffect(() => {}, [warning]);

  return (
    <>
      <Header />
      <Container>
        {warning && loggedIn && <Message color="orange" message={warning} />}
      </Container>
      <div className="content">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/posts" component={Home} />
          <GuestRoute path="/login" component={Login} />
          <GuestRoute path="/register" component={Register} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute
            exact
            path="/posts/add"
            component={AddEditPost}
            propsForComponent={{ editMode: false }}
          />
          <Route exact path="/posts/:slug" component={PostDetail} />
          <PrivateRoute
            path="/posts/:id/edit"
            component={AddEditPost}
            propsForComponent={{ editMode: true }}
          />
          <GuestRoute path="/forgot_password" component={ForgotPassword} />
          <Route path="/verification" component={Verification} />
          <GuestRoute path="/reset_password" component={ResetPassword} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </>
  );
};
