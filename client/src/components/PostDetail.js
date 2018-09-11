import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";

import CommentForm from "./forms/CommentForm";
import CommentItem from "./CommentItem";

import { getPost } from "../actions/postsActions";
import { getComments, getCommentsByPostID } from "../actions/commentsActions";

import { Loader, Image } from "semantic-ui-react";

class PostDetail extends React.Component {
    componentDidMount() {
        const {
            match: { params }
        } = this.props;
        this.props.getPost(params.id);
        this.props.getComments();
    }

    render() {
        const { post, comments } = this.props;
        return (
            <div>
                {post ? (
                    <div className="detail">
                        <h1 className="detail-post-title">{post.title}</h1>
                        <div className="author">
                            <img
                                className="author-image"
                                alt={post.author.name}
                                src={post.author.avatar}
                            />
                            <div className="author-info">
                                <h5>{post.author.name}</h5>
                            </div>
                        </div>
                        <Image
                            className="detail-image"
                            src={post.image}
                            centered
                            fluid
                        />
                        <p dangerouslySetInnerHTML={{ __html: post.body }} />
                        {localStorage.getItem("user")
                            ? JSON.parse(localStorage.getItem("user"))
                                  .username === post.author.username && (
                                  <Link to={`${post._id}/edit`}>Edit post</Link>
                              )
                            : null}
                        {comments ? (
                            comments.map((c, i) => {
                                return <CommentItem comment={c} key={i} />;
                            })
                        ) : (
                            <Loader active />
                        )}
                    </div>
                ) : (
                    <Loader active />
                )}
                <CommentForm />
            </div>
        );
    }
}

PostDetail.propTypes = {
    post: PropTypes.object,
    comments: PropTypes.array,
    getPost: PropTypes.func,
    getComments: PropTypes.func
};

const mapStateToProps = state => {
    return {
        post: state.posts.post,
        comments: getCommentsByPostID(state)
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        { getPost, getComments }
    )(PostDetail)
);
