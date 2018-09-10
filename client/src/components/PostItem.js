import React from "react";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Card, Image } from "semantic-ui-react";

const PostItem = ({ post }) => (
    <Card>
        <Link to={`/posts/${post._id}`}>
            <Image src={post.image} />
            <Card.Header>{post.title}</Card.Header>
            <Card.Content>
                <Card.Description
                    dangerouslySetInnerHTML={{ __html: post.body }}
                />
            </Card.Content>
        </Link>
    </Card>
);

PostItem.propTypes = {
    post: PropTypes.object
};

export default PostItem;
