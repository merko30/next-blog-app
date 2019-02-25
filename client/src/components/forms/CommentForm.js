import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";

import { Button, Form } from "semantic-ui-react";

import { addComment } from "actions";

export class CommentForm extends React.Component {
        
    state = {
            data: {
                comment: ""
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
        e.preventDefault();

        const { match: { params }, addComment } = this.props;
        const { data } = this.state;

        const errors = this.validate(data);
        
        this.setState({ errors }, () => {
            if (Object.keys(this.state.errors).length === 0) {
                addComment(params.id, this.state.data);
                this.setState(prevState => ({
                    data: { ...prevState.data, comment: "" }
                }));
            }
        });
    };

    validate = data => {
        const errors = {};

        if (!data.comment) errors.comment = "Comment is required";
        if (data.comment.length < 8)
            errors.comment = "Comment must have at least 8 characters";

        return errors;
    };

    render() {
        return (
            <Form reply onSubmit={this.handleSubmit}>

                <Form.TextArea
                    data-testid="comment"
                    name="comment"
                    value={this.state.data.comment}
                    onChange={this.handleChange}
                />
                <Button
                    disabled={!this.props.isLoggedIn}
                    content="Add comment"
                    primary
                    type="submit"
                />
            </Form>
        );
    }
}

CommentForm.propTypes = {
    isLoggedIn: PropTypes.bool,
    addComment: PropTypes.func
};

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    };
};
export default withRouter(
    connect(
        mapStateToProps,
        { addComment }
    )(CommentForm)
);
