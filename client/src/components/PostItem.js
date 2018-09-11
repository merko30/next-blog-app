import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PostItem = ({ post }) => (
    <Link to={`/posts/${post._id}`}>
        <div
            className="card"
            style={{ backgroundImage: "url(" + post.image + ")" }}
        >
            <div className="card-title">
                <h3 className="card-text">{post.title}</h3>
                <p className="card-text">by {post.author.username}</p>
            </div>
        </div>
    </Link>
);

PostItem.propTypes = {
    post: PropTypes.object
};

export default PostItem;
