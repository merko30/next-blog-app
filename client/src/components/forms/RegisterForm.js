import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Form, Button, Loader } from "semantic-ui-react";

import validator from "email-validator";

import { signUp } from "../../actions/authActions/authActions";

import Error from "../Utils/Error";
import Success from "../Utils/Success";

export class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                username: "",
                name: "",
                avatar: {},
                email: "",
                password: ""
            },
            errors: {}
        };
    }

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
        const { errors, data } = this.state;
        const { message, loading, error } = this.props;
        return (
            <div>
                {message && <Success message={message} />}
                {error && <Error error={error} />}
                {loading && <Loader active inline="centered" />}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>

                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            placeholder="Username"
                            name="username"
                            type="text"
                            onChange={this.handleChange}
                            value={data.username}
                        />
                    </Form.Field>
                    {errors.username && <Error error={errors.username} />}

                    <Form.Field>

                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            placeholder="Name"
                            name="name"
                            type="text"
                            onChange={this.handleChange}
                            value={data.name}
                        />
                    </Form.Field>
                    {errors.name && <Error error={errors.name} />}


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
                    <Form.Field>

                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            placeholder="Email"
                            name="email"
                            type="email"
                            onChange={this.handleChange}
                            value={data.email}
                        />
                    </Form.Field>
                    {errors.email && <Error error={errors.email} />}

                    <Form.Field>

                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
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
