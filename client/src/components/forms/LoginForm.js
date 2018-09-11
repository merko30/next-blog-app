import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { signIn } from "../../actions/authActions";

import { Form, Button, Loader } from "semantic-ui-react";

import Error from "../Utils/Error";
import Success from "../Utils/Success";

class LoginForm extends React.Component {
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
        const { message, loading, success } = this.props;
        const { errors } = this.state;
        return (
            <div>
                {message && success && <Success message={message} />}
                {message && !success && <Error error={message} />}
                {loading && <Loader active inline="centered" />}
                <Form className="form " onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label>Username</label>
                        <input
                            placeholder="Username"
                            name="username"
                            type="text"
                            value={this.state.data.username}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    {errors.username && <Error error={errors.username} />}
                    <Form.Field>
                        <label>Password</label>
                        <input
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
            </div>
        );
    }
}

LoginForm.propTypes = {
    signIn: PropTypes.func
};

const mapStateToProps = state => {
    return {
        message: state.messages.message,
        loading: state.auth.loading,
        success: state.messages.success
    };
};

export default connect(
    mapStateToProps,
    { signIn }
)(LoginForm);
