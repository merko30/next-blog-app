import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";


import { addPost, editPost } from "../../actions/postsActions/postsActions";

import { Form, Button, Loader } from "semantic-ui-react";

import Error from "../Utils/Error";
import Success from "../Utils/Success";

export class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                title: "",
                body: "",
                image: {}
            },
            errors: {},
            loading: false,
            wantToChangeCoverImage: false
        };
    }

    handleChange = e => {
        let { name, value } = e.target;
        if (name === 'image') {
            this.setState({
                ...this.state,
                data: { ...this.state.data, image: e.target.files[0] }
            })
        } else {
            this.setState({
                ...this.state,
                data: { ...this.state.data, [name]: value }
            });
        }
    };


    validate = data => {
        const errors = {};
        if (!data.title) {
            errors.title = "Title is required";
        }
        if (data.title && data.title.length < 12) {
            errors.title = "Title should be longer than 12 characters";
        }
        if (Object.keys(data.image).keys === 0) {
            errors.image = "Cover image is required";
        }
        if (Object.keys(data.image).length > 0 &&
            !(data.image.type === 'image/jpg' || data.image.type === 'image/jpeg' || data.image.type === 'image/png')) {
            errors.image = "Invalid image type";
        }
        if (!data.body) {
            errors.body = "Post content is required";
        }
        if (data.body.length < 150) {
            errors.body = "Post content should be longer than 150 characters";
        }
        return errors;
    };

    handleSubmit = e => {
        e.preventDefault();
        const errs = this.validate(this.state.data);
        this.setState({ errors: errs }, () => {
            if (Object.keys(this.state.errors).length === 0) {
                if (this.props.mode === "add") {
                    this.props.addPost(this.state.data);
                } else if (this.props.mode === "edit") {
                    this.props.editPost(
                        this.state.data,
                        this.props.post._id
                    );
                }
            }
        }
        );
    };

    toggleChangeImage = () => {
        this.setState(({ wantToChangeCoverImage }) =>
            ({ wantToChangeCoverImage: !wantToChangeCoverImage })
        )
    }


    componentDidMount() {
        const { post, mode } = this.props;
        if (post && mode === "edit") {
            const newState = {
                ...this.state.data,
                title: post.title,
                body: post.body,
                //image: post.image
            };
            this.setState({ data: newState });
        }
    }

    componentWillUnmount() {
        this.setState({
            wantToChangeCoverImage: false
        })
    }

    render() {
        const { message, loading, success, mode } = this.props;
        const { errors, wantToChangeCoverImage } = this.state;
        return (
            <div>
                {message && success && <Success message={message} />}
                {message && !success && <Error error={message} />}
                {loading && <Loader active inline="centered" />}
                <Form className="form " onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            placeholder="Post title"
                            name="title"
                            type="text"
                            value={this.state.data.title}
                            onChange={this.handleChange}
                        />
                        {errors.title && <Error error={errors.title} />}
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="body">Post content</label>
                        <textarea
                            id="body"
                            placeholder="Post body"
                            name="body"
                            type="text"
                            value={this.state.data.body}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    {errors.body && <Error error={errors.body} />}
                    {(mode === 'add' || (mode === 'edit' && wantToChangeCoverImage)) && <Form.Field>
                        <label htmlFor="image">Cover Image</label>
                        <input
                            id="image"
                            placeholder="Cover image"
                            name="image"
                            type="file"
                            onChange={this.handleChange}
                        />
                    </Form.Field>}
                    {mode === 'edit' && <Button type="button" onClick={this.toggleChangeImage}>
                        {wantToChangeCoverImage ? "Cancel" : "Change cover image"}
                    </Button>}
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
