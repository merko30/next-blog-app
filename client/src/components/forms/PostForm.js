import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { addPost, editPost } from "../../actions/postsActions";

import { Form, Button, Loader } from "semantic-ui-react";

import Error from "../Utils/Error";
import Success from "../Utils/Success";

class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                title: "",
                body: "",
                image: ""
            },
            errors: {},
            loading: false
        };
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
    };

    validate = data => {
        const errors = {};
        console.log(data);
        if (!data.title) {
            errors.title = "Title is required";
        }
        if (!data.image) {
            errors.image = "Image is required";
        }
        if (
            data.image.length > 0 &&
            !data.image.match(/^\.|\.jpg$|.png$|.jpeg$/g)
        ) {
            errors.image = "Invalid image type";
        }
        if (data.title && data.title.length < 8) {
            errors.title = "Title should be longer than 8 characters";
        }
        if (!data.body) {
            errors.body = "Post content is required";
        }
        if (data.body.length > 0 && data.body.length < 250) {
            errors.body = "Post content should be longer than 250 characters";
        }
        return errors;
    };

    handleSubmit = e => {
        e.preventDefault();
        const errs = this.validate(this.state.data);
        this.setState(
            {
                errors: errs
            },
            () => {
                if (Object.keys(this.state.errors).length === 0) {
                    if (this.props.mode === "add") {
                        this.props.addPost(this.state.data);
                    } else if (this.props.mode === "edit") {
                        this.props.editPost(
                            this.props.post._id,
                            this.state.data
                        );
                    }
                }
            }
        );
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
        const { errors } = this.state;
        return (
            <div>
                {message && success && <Success message={message} />}
                {message && !success && <Error error={message} />}
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
                        {errors.title && <Error error={errors.title} />}
                    </Form.Field>
                    <CKEditor
                        editor={ClassicEditor}
                        data={this.state.data.body}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            this.setState({
                                data: { ...this.state.data, body: data }
                            });
                        }}
                    />
                    {errors.body && <Error error={errors.body} />}
                    <Form.Field>
                        <input
                            placeholder="Image URL"
                            name="image"
                            type="text"
                            value={this.state.data.image}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    {errors.image && <Error error={errors.image} />}

                    <Button type="submit">
                        {this.props.mode === "add" ? "Add post" : "Edit Post"}
                    </Button>
                </Form>
            </div>
        );
    }
}

PostForm.propTypes = {
    mode: PropTypes.string,
    addPost: PropTypes.func,
    editPost: PropTypes.func,
    post: PropTypes.object
};

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
