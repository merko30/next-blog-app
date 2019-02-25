
import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getPosts } from 'actions';

import { PostList } from 'components';

class PostContainer extends Component {

  componentDidMount() {
      const { getPosts } = this.props;
      getPosts();
  }

  render() {
    const { posts, loading } = this.props;
    return (
      <div>
        {loading && <p>loading...</p>}
        {posts && <PostList posts={posts} />}
      </div>
    )
  }
}

const mapStateToProps = ({ posts: { posts, loading } }) => ({
    posts,
    loading
})

export default connect(mapStateToProps, { getPosts })(PostContainer);
