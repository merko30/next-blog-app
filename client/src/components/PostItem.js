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
            }),
        })
    };

  render() {
    const { post: {_id, image, title, author: { name } } } = this.props;
    return (
        <Link to={`/post/${_id}`} data-testid="post-link">
        <div
            data-testid="card"
            className="card"
            style={{ backgroundImage: `url(http://localhost:5000/uploads/${image})` }}
        >
            <div className="card-title">
                <h3 className="card-text">{title}</h3>
                <p className="card-text">by {name}</p>
            </div>
        </div>
    </Link>
    )
  }
}


export default PostItem;