import React from "react";
import { connect } from "react-redux";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { addPost, editPost } from "../../actions/postsActions";

import { Form, Button, Message, Loader } from "semantic-ui-react";

class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                title: "",
                body: "",
                image: "",
                keywords: []
            },
            errors: {},
            loading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const errs = this.validate(this.state.data);
        this.setState({
            errors: errs
        });
        if (Object.keys(this.state.errors).length === 0) {
            if (this.props.mode === "add") {
                this.props.addPost(this.state.data);
            } else if (this.props.mode === "edit") {
                this.props.editPost(this.props.post._id, this.state.data);
            }
        }
    };

    validate = data => {
        const errors = {};

        if (!data.title) errors.title = "Title is required";
        if (!data.body) errors.body = "Post body is required";

        return errors;
    };

    componentDidMount() {
        const { post, mode } = this.props;
        if (post && mode === "edit") {
            const newState = {
                ...this.state.data,
                title: post.title,
                body: post.body,
                image: post.image
            };
            this.setState({ data: newState });
        }
    }

    render() {
        const { message, loading, success } = this.props;
        return (
            <div>
                {message &&
                    success && (
                        <Message
                            className="center aligned container"
                            success
                            header={message}
                            content="You will be redirected"
                        />
                    )}
                {message &&
                    !success && (
                        <Message
                            className="center aligned container"
                            error
                            header={message}
                        />
                    )}
                {loading && <Loader active inline="centered" />}
                <Form className="form " onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <input
                            placeholder="Post title"
                            name="title"
                            type="text"
                            value={this.state.data.title}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <CKEditor
                        editor={ClassicEditor}
                        data={this.state.data.body}
                        onInit={editor => {
                            // You can store the "editor" and use when it's needed.
                            console.log("Editor is ready to use!", editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            this.setState({
                                data: { ...this.state.data, body: data }
                            });
                        }}
                    />
                    <Form.Field>
                        <input
                            placeholder="Image URL"
                            name="image"
                            type="text"
                            value={this.state.data.image}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    {this.props.mode === "add" ? (
                        <Button type="submit">Add post</Button>
                    ) : (
                        <Button type="submit">Edit post</Button>
                    )}
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        message: state.messages.message,
        error: state.posts.error,
        post: state.posts.post,
        success: state.messages.success
    };
};

export default connect(
    mapStateToProps,
    { addPost, editPost }
)(PostForm);
