import React from "react";
import { Switch, Route } from "react-router-dom";

import Footer from "../layout/Footer";
import Header from "../layout/Header/index";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import AddEditPost from "../pages/AddEditPost";
import PostDetail from "../pages/PostDetail";

import PrivateRoute from "./PrivateRoute";
import GuestRoute from "./GuestRoute";
import Verification from "../pages/Verification";
import ResetPassword from "../pages/ResetPassword";

export default () => {
  return (
    <>
      <Header />
      <div className="content">
        <Switch>
          <Route exact path="/" component={Home} />
          <GuestRoute path="/login" component={Login} />
          <GuestRoute path="/register" component={Register} />
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
          <Route path="/verification" component={Verification} />
          <Route path="/reset_password" component={ResetPassword} />
        </Switch>
      </div>
      <Footer />
    </>
  );
};
