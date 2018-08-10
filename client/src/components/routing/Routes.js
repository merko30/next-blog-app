import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../core/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import PostList from "../PostList";
import PostDetail from "../PostDetail";
import AddEditPost from "../AddEditPost";
import PrivateRoute from "./PrivateRoute";

class Routes extends React.Component {
  render() {
    return (
      <main id="main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={PostList} />
          <PrivateRoute exact path="/posts/new" component={AddEditPost} />
          <PrivateRoute exact path="/posts/:id/edit" component={AddEditPost} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/posts/:id" component={PostDetail} />
        </Switch>
      </main>
    );
  }
}

export default Routes;
