import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";

import { CommentForm, CommentItem } from 'components';

import { getPost } from "actions";

import { Image } from "semantic-ui-react";

export class PostDetail extends React.Component {
    componentDidMount() {
        const {
            match: { params }
        } = this.props;
        this.props.getPost(params.id);
    }
    
    render() {
        const { post, currentUser, loggedIn } = this.props;
        return (
            <div>
                {post && (
                    <div className="detail">
                        <h1 className="detail-post-title">{post.title}</h1>
                        <div className="author">
                            <img
                                className="author-image"
                                alt={post.author.name}
                                src={'http://localhost:5000/uploads/' + post.author.avatar}
                            />
                            <div className="author-info">
                                <h5>{post.author.name}</h5>
                            </div>
                        </div>
                        <Image
                            className="detail-image"
                            src={'http://localhost:5000/uploads/' + post.image}
                            centered
                            fluid
                        />
                        <p dangerouslySetInnerHTML={{ __html: post.body }} />
                        {loggedIn && currentUser._id === post.author._id ? (
                            <Link to={`${post._id}/edit`}>Edit post</Link>
                        )
                            : null}
                        {post.comments.map(comment => {
                            return <CommentItem key={comment._id} postID={post._id} comment={comment} />
                        })}

                    </div>
                )}
                <CommentForm />
            </div>
        );
    }
}

PostDetail.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string,
        body: PropTypes.string,
        image: PropTypes.string,
        author: PropTypes.shape({
            name: PropTypes.string,
            username: PropTypes.string,
            email: PropTypes.string,
            _id: PropTypes.string,
        }).isRequired
    }),
    getPost: PropTypes.func.isRequired,
    currentUser: PropTypes.shape({
        name: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string,
        _id: PropTypes.string,
    })
};

const mapStateToProps = ({ posts, auth }) => {
    return {
        post: posts.post,
        currentUser: auth.user,
        loggedIn: auth.isLoggedIn
    };
};



export default withRouter(
    connect(
        mapStateToProps,
        { getPost }
    )(PostDetail)
);
