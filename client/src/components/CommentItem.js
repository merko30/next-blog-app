import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { removeComment } from "../actions/commentsActions/commentsActions";

import { Icon } from "semantic-ui-react";

export class CommentItem extends React.Component {
    render() {
        const { comment, postID, currentUser, loggedIn } = this.props;
        if (comment) {

            return (
                <div className="comment-container">
                    <img
                        className="comment-avatar"
                        alt={comment.author.name}
                        as="a"
                        src={`http://localhost:5000/uploads/${comment.author.avatar}`}
                    />
                    <div className="comment-content">
                        <div className="comment-author">{comment.author.name}</div>
                        <div>
                            <div className="comment-metadata">
                                {comment.created_at.split("T")[0]}
                            </div>
                        </div>
                        <div className="comment">{comment.comment}</div>
                    </div>
                    {loggedIn && currentUser &&
                        comment.author._id ===
                        currentUser._id && (
                            <Icon
                                data-testid="x-icon"
                                name="close"
                                id="x-icon"
                                onClick={() =>
                                    this.props.removeComment(comment._id, postID)
                                }
                            />
                        )}
                </div>
            );
        }
    }
}

CommentItem.propTypes = {
    removeComment: PropTypes.func,
    comment: PropTypes.object
};

const mapStateToProps = ({ auth }) => {
    return {
        currentUser: auth.user,
        loggedIn: auth.isLoggedIn
    };
};

export default connect(
    mapStateToProps,
    { removeComment }
)(CommentItem);
