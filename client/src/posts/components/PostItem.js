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
        body,
        image,
        created_at,
        title,
        author: { name }
      }
    } = this.props;
    return (
      <Link to={`/posts/${_id}`} data-testid="post-link" className="shadow">
        <div className="p-2">
          <img
            src="http://res.publicdomainfiles.com/pdf_view/185/14006695215558.jpg"
            className="image"
            alt={title}
          />
          <div className="px-1 mt-1">
            <h2 className="font-bold truncate">{title}</h2>
            <p className="text-gray-500 truncate text-sm">{body}</p>
          </div>
        </div>
      </Link>
    );
  }
}

export default PostItem;
