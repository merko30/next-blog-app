import React, { PureComponent, Suspense, lazy } from "react";
import { PropTypes } from "prop-types";
import { Grid } from "semantic-ui-react";

const PostItem = lazy(() => import("./PostItem"));

class PostList extends PureComponent {
  render() {
    const { posts } = this.props;
    return (
      <Grid columns="four" stackable divided stretched className="center-stuff">
        {posts.map(f => {
          return (
            <Suspense fallback={<p>loading...</p>} key={f._id}>
              <PostItem post={f} />
            </Suspense>
          );
        })}
      </Grid>
    );
  }
}

PostList.propTypes = {
  getPosts: PropTypes.func,
  posts: PropTypes.array
};

export { PostList };

export default PostList;
