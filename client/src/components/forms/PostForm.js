import React from "react";
import { connect } from "react-redux";

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
    console.log(this.state.data);
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
        image: post.image,
        keywords: post.keywords.join(",")
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
          <Form.Field>
            <textarea
              placeholder="Post content"
              name="body"
              type="text"
              value={this.state.data.body}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              placeholder="Image URL"
              name="image"
              type="text"
              value={this.state.data.image}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              placeholder="Add some keywords separated by commas..."
              name="keywords"
              type="text"
              value={this.state.data.keywords}
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
