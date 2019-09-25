import React from "react";
import { Switch, Route } from "react-router-dom";

import Footer from "../layout/Footer";
import Header from "../layout/Header/index";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";

// import PrivateRoute from "./PrivateRoute";
import GuestRoute from "./GuestRoute";

export default () => {
  return (
    <>
      <Header />
      <div className="content">
        <Switch>
          <Route exact path="/" component={Home} />
          <GuestRoute path="/login" component={Login} />
          <GuestRoute path="/register" component={Register} />
        </Switch>
      </div>
      <Footer />
    </>
  );
};
