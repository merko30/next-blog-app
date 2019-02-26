import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, Image, Icon } from "semantic-ui-react";

class PostItem extends PureComponent {
  static propTypes = {
    post: PropTypes.shape({
      title: PropTypes.string,
      image: PropTypes.string,
      author: PropTypes.shape({
        name: PropTypes.string
      })
    })
  };

  render() {
    const {
      post: {
        _id,
        image,
        created_at,
        title,
        author: { name }
      }
    } = this.props;
    return (
      <Link
        to={`/post/${_id}`}
        data-testid="post-link"
        style={{ margin: "1em 0" }}
      >
        <Card>
          <Image src={`http://localhost:5000/uploads/${image}`} />
          <Card.Content>
            <Card.Header>{title}</Card.Header>
            <Card.Meta>
              <span className="date">{created_at.split("T")[0]}</span>
            </Card.Meta>
            <Card.Content extra>
              <span style={{ color: "#333" }}>
                <Icon name="user" />
                {name}
              </span>
            </Card.Content>
          </Card.Content>
        </Card>
      </Link>
    );
  }
}

export default PostItem;
