import React from "react";
import { connect } from 'react-redux';
import { removeComment } from '../actions/commentsActions';

import { Icon, Loader } from 'semantic-ui-react';

class CommentItem extends React.Component {


  render() {
    const { comment, loading } = this.props;
    return (
      
      <div className="comment-container">
        <img
          className="comment-avatar"
          alt={comment.author.name}
          as="a"
          src={comment.author.avatar}
        />
        <div className="comment-content">
          <div className="comment-author">{comment.author.name}</div>
          <div>
            <div className="comment-metadata">
              {comment.created_at.split("T")[0]}
            </div>
          </div>
          <div className="comment">{comment.comment}</div>
        </div>
        {localStorage.getItem('user') && comment.author.username === JSON.parse(localStorage.getItem('user')).username &&
         <Icon name="close" id="x-icon" onClick={() => this.props.removeComment(comment._id)}/>}
         </div>
         
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.comments.loading
  }
}

export default connect(mapStateToProps, {removeComment})(CommentItem);
