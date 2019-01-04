import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
    return <Link to={`/post/${post._id}`} data-testid="post-link">
        <div
            data-testid="card"
            className="card"
            style={{ backgroundImage: `url(http://localhost:5000/uploads/${post.image})` }}
        >
            <div className="card-title">
                <h3 className="card-text">{post.title}</h3>
                <p className="card-text">by {post.author.username}</p>
            </div>
        </div>
    </Link>
}

PostItem.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string,
        image: PropTypes.string,
        author: PropTypes.shape({
            username: PropTypes.string
        }),
    })
};

export default PostItem;
