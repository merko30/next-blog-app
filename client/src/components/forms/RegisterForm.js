import React from "react";
import { connect } from "react-redux";

import { Form, Button, Message, Loader } from "semantic-ui-react";

import validator from "email-validator";

import { signUp } from "../../actions/authActions";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: "",
        name: "",
        avatar: "",
        email: "",
        password: ""
      },
      errors: {}
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
      this.props.signUp(this.state.data);
    }
  };

  validate = data => {
    const errors = {};

    if (!data.username) errors.username = "Username is required";
    if (!data.name) errors.name = "Name is required";
    if (!data.email) errors.email = "Email is required";
    if (!validator.validate(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Password is required";

    return errors;
  };

  render() {
    const { errors, data } = this.state;
    const { message, loading, success } = this.props;
    console.log();
    return (
      <div>
        {message && success && <Message success header={message} />}
        {message && !success && <Message error header={message} />}
        {loading && <Loader active inline="centered" />}
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <input
              placeholder="Username"
              name="username"
              type="text"
              onChange={this.handleChange}
              value={data.username}
            />
          </Form.Field>
          {errors.username && <Message error header={errors.username} />}

          <Form.Field>
            <input
              placeholder="Name"
              name="name"
              type="text"
              onChange={this.handleChange}
              value={data.name}
            />
          </Form.Field>
          {errors.name && <Message error header={errors.name} />}

          <Form.Field>
            <input
              placeholder="Avatar photo URL"
              name="avatar"
              type="text"
              onChange={this.handleChange}
              value={data.avatar}
            />
          </Form.Field>

          <Form.Field>
            <input
              placeholder="Email"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={data.email}
            />
          </Form.Field>
          {errors.email && <Message error header={errors.email} />}

          <Form.Field>
            <input
              placeholder="Password"
              name="password"
              type="password"
              onChange={this.handleChange}
              value={data.password}
            />
          </Form.Field>
          {errors.password && <Message error header={errors.password} />}

          <Button type="submit">Register</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    message: state.auth.message,
    error: state.auth.error,
    loading: state.auth.loading,
    success: state.auth.success
  };
};

export default connect(
  mapStateToProps,
  { signUp }
)(RegisterForm);
