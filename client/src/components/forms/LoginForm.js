import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { signIn } from "../../actions";

import { Form, Button, Loader, Container } from "semantic-ui-react";

import { Error, Success } from '../';
import { Input } from './components';

export class LoginForm extends React.Component {
   state = {
            data: {
                username: "",
                password: ""
            },
            errors: {},
            loading: false
        };
  

    handleChange = e => {
        this.setState({
            ...this.state,
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
    };

    handleSubmit = e => {
        const { data } = this.state;
        const { signIn } = this.props;
        e.preventDefault();
        const errors = this.validate(data);
        this.setState(
            {
                errors
            },
            () => {
                if (Object.keys(this.state.errors).length === 0) {
                    signIn(data);
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
        const { errors, data: { username, password } } = this.state;
        return (
            <Container>
                {error && <Error error={error} />}
                {message && <Success message={message} />}
                {loading && <Loader active inline="centered" />}
                <Form className="form " onSubmit={this.handleSubmit}>
                <Input 
                    id="username"
                    name="username"
                    type="text"
                    label="Username"
                    onChange={this.handleChange}
                    value={username}
                    error={errors.username && errors.username}
                 />
                    <Input 
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    onChange={this.handleChange}
                    value={password}
                    error={errors.password && errors.password}
                 />
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
