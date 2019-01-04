import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { signIn } from "../../actions/authActions/authActions";

import { Form, Button, Loader, Container } from "semantic-ui-react";

import Error from "../Utils/Error";
import Success from "../Utils/Success";

export class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                username: "",
                password: ""
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

    handleSubmit = e => {
        e.preventDefault();
        const errs = this.validate(this.state.data);
        this.setState(
            {
                errors: errs
            },
            () => {
                if (Object.keys(this.state.errors).length === 0) {
                    this.props.signIn(this.state.data);
                }
            }
        );
    };

    validate = data => {
        const errors = {};

        if (!data.username) errors.username = "Username is required";
        if (!data.password) errors.password = "Password is required";

        return errors;
    };

    render() {
        const { message, loading, error } = this.props;
        const { errors } = this.state;
        return (
            <Container>
                {error && <Error error={error} />}
                {message && <Success message={message} />}
                {loading && <Loader active inline="centered" />}
                <Form className="form " onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            placeholder="Username"
                            name="username"
                            type="text"
                            value={this.state.data.username}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    {errors.username && <Error error={errors.username} />}
                    <Form.Field>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            placeholder="Password"
                            name="password"
                            type="password"
                            value={this.state.data.password}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    {errors.password && <Error error={errors.password} />}
                    <Button type="submit">Login</Button>
                    <Link to="/register" className="margin">
                        You don't have an account ? Sign Up
                    </Link>
                </Form>
            </Container>
        );
    }
}

LoginForm.propTypes = {
    signIn: PropTypes.func
};

const mapStateToProps = ({ messages, auth }) => {
    return {
        message: messages.message,
        loading: auth.loading,
        error: auth.error
    };
};

export default connect(
    mapStateToProps,
    { signIn }
)(LoginForm);
