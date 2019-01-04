import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../layout/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import PostList from "../PostList";
import PostDetail from "../PostDetail";
import AddEditPost from "../AddEditPost";
import PrivateRoute from "./PrivateRoute";
import GuestRoute from "./GuestRoute";

class Routes extends React.Component {
    render() {
        return (
            <main id="main" style={{ flex: "1" }}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/feed" component={PostList} />
                    <PrivateRoute

                        path="/post/new"
                        component={AddEditPost}
                    />
                    <PrivateRoute

                        path="/post/:id/edit"
                        component={AddEditPost}
                    />
                    <GuestRoute path="/login" component={Login} />
                    <GuestRoute path="/register" component={Register} />
                    <Route path="/post/:id" component={PostDetail} />
                </Switch>
            </main>
        );
    }
}

export default Routes;
