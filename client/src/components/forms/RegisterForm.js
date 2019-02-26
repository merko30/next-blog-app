import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Form, Button, Loader } from "semantic-ui-react";

import validator from "email-validator";

import { signUp } from "../../actions";

import { Input } from './components';
import { Error, Success } from '../';

export class RegisterForm extends React.Component {
        state = {
            data: {
                username: "",
                name: "",
                avatar: {},
                email: "",
                password: ""
            },
            errors: {}
        };

    handleChange = e => {
        let { name, value } = e.target;
        if (name === 'avatar') {
            this.setState({
                ...this.state,
                data: { ...this.state.data, avatar: e.target.files[0] }
            })
        } else {
            this.setState({
                ...this.state,
                data: { ...this.state.data, [name]: value }
            });
        }
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
        if (data.username && data.username.length < 8)
            errors.username = "Username must be longer than 8 characters";

        if (!data.name) errors.name = "Name is required";
        if (data.name && data.name.length < 6)
            errors.name = "Name must be longer than 6 characters";
        if (!data.email) errors.email = "Email is required";
        if (data.email && !validator.validate(data.email))
            errors.email = "Invalid email";
        if (!data.password) errors.password = "Password is required";
        if (data.password && data.password.length < 8) errors.password = "Password must be longer than 8 characters";
        if (Object.keys(data.avatar).length > 0 &&
            !(data.avatar.type === 'image/jpg' || data.avatar.type === 'image/jpeg' || data.avatar.type === 'image/png')) {
            errors.avatar = "Invalid image type";
        }



        return errors;
    };

    render() {
        const { errors, data: { username, name, email, password } } = this.state;
        const { message, loading, error } = this.props;
        return (
            <div>
                {message && <Success message={message} />}
                {error && <Error error={error} />}
                {loading && <Loader active inline="centered" />}
                <Form onSubmit={this.handleSubmit}>
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
                    id="name"
                    name="name"
                    type="text"
                    label="Name"
                    onChange={this.handleChange}
                    value={name}
                    error={errors.name && errors.name}
                 />


                    <Form.Field>
                        <label htmlFor="avatar">Avatar</label>
                        <input
                            id="avatar"
                            placeholder="Avatar"
                            name="avatar"
                            type="file"
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    {errors.avatar && <Error error={errors.avatar} />}
                    <Input 
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    onChange={this.handleChange}
                    value={email}
                    error={errors.email && errors.email}
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

                    <Button type="submit">Register</Button>
                </Form>
            </div>
        );
    }
}

RegisterForm.propTypes = {
    signUp: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        message: state.auth.message,
        error: state.auth.error,
        loading: state.auth.loading,
    };
};

export default connect(
    mapStateToProps,
    { signUp }
)(RegisterForm);
