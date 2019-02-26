import React, { Component } from "react";
import { connect } from "react-redux";

import { getPosts } from "actions";

import { PostList } from "components";
import { Container, Pagination, Divider } from "semantic-ui-react";

class PostContainer extends Component {
  componentDidMount() {
    const { getPosts } = this.props;
    getPosts();
  }

  onPageChange = (e, data) => {
    const { getPosts } = this.props;
    const { activePage } = data;
    getPosts(activePage);
  };

  render() {
    const { posts, loading, numberOfPages } = this.props;
    return (
      <Container textAlign="center">
        {loading && <p>loading...</p>}
        {posts && <PostList posts={posts} />}
        <Divider />
        {numberOfPages && (
          <Pagination
            boundaryRange={1}
            defaultActivePage={1}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
            totalPages={numberOfPages}
            onPageChange={this.onPageChange}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = ({
  posts: { posts, numberOfPages, current, loading }
}) => ({
  posts,
  numberOfPages,
  current,
  loading
});

export default connect(
  mapStateToProps,
  { getPosts }
)(PostContainer);
