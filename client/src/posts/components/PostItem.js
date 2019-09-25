import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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
        to={`/posts/${_id}`}
        data-testid="post-link"
        style={{ margin: "1em 0" }}
      >
        <div>
          <h2 className="font-bold">{title}</h2>
        </div>
      </Link>
    );
  }
}

export default PostItem;
