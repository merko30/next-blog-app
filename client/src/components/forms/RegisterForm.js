import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Form, Button, Loader } from "semantic-ui-react";

import validator from "email-validator";

import { signUp } from "../../actions/authActions";

import Error from "../Utils/Error";
import Success from "../Utils/Success";

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
        this.setState(
            {
                errors: errs
            },
            () => {
                if (Object.keys(this.state.errors).length === 0) {
                    this.props.signUp(this.state.data);
                }
            }
        );
    };

    validate = data => {
        const errors = {};

        if (!data.username) errors.username = "Username is required";
        if (data.username && data.username.length < 4)
            errors.username = "Username must be longer than 4 characters";

        if (!data.name) errors.name = "Name is required";
        if (data.name && data.name.length < 8)
            errors.name = "Name must be longer than 8 characters";
        if (!data.email) errors.email = "Email is required";
        if (data.email && !validator.validate(data.email))
            errors.email = "Invalid email";
        if (!data.password) errors.password = "Password is required";

        return errors;
    };

    render() {
        const { errors, data } = this.state;
        const { message, loading, success } = this.props;
        return (
            <div>
                {message && success && <Success message={message} />}
                {message && !success && <Error error={message} />}
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
                    {errors.username && <Error error={errors.username} />}

                    <Form.Field>
                        <input
                            placeholder="Name"
                            name="name"
                            type="text"
                            onChange={this.handleChange}
                            value={data.name}
                        />
                    </Form.Field>
                    {errors.name && <Error error={errors.name} />}

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
                    {errors.email && <Error error={errors.email} />}

                    <Form.Field>
                        <input
                            placeholder="Password"
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                            value={data.password}
                        />
                    </Form.Field>
                    {errors.password && <Error error={errors.password} />}

                    <Button type="submit">Register</Button>
                </Form>
            </div>
        );
    }
}

RegisterForm.propTypes = {
    signUp: PropTypes.func
};

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
