import React from "react";
import { Link } from "react-router-dom";

import { Card, Image } from "semantic-ui-react";

class PostItem extends React.Component {
  render() {
    const { post } = this.props;
    return (
      <Card>
        <Link to={`/posts/${post._id}`}>
          <Image src={post.image} />
          <Card.Header>{post.title}</Card.Header>
          <Card.Content>
            <Card.Description>{post.body}</Card.Description>
          </Card.Content>
        </Link>
      </Card>
    );
  }
}

export default PostItem;
