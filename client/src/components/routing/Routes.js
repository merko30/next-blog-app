import React from "react";
import { Switch, Route } from "react-router-dom";

import { PostDetail, Home, Register, Login, AddEditPost } from 'pages';
import { PrivateRoute, GuestRoute } from 'components';

class Routes extends React.Component {
    render() {
        return (
            <main id="main" style={{ flex: "1" }}>
                <Switch>
                    <Route exact path="/" component={Home} />
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
