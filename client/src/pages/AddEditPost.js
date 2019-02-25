import React from "react";
import { withRouter } from "react-router-dom";

import { PostForm } from "components";

class AddEditPost extends React.Component {
    render() {
        const { match: { params }} = this.props;
        return (
            <div>
                {!params.id ? (
                    <h1 className="center-text">Add new post</h1>
                ) : (
                    <h1 className="center-text">Edit post</h1>
                )}
                {!params.id ? (
                    <PostForm mode="add" />
                ) : (
                    <PostForm mode="edit" />
                )}
            </div>
        );
    }
}

export default withRouter(AddEditPost);
