import React, { PureComponent } from "react";
import { PropTypes } from "prop-types";

import { PostItem } from "components";

class PostList extends PureComponent {
    render() {
        const { posts } = this.props;
        return (
                <div className="grid">
                    {posts && posts.map(f => {
                        return <PostItem key={f._id} post={f} />;
                    })}
                </div>
            );
    }
}

PostList.propTypes = {
    getPosts: PropTypes.func,
    posts: PropTypes.array
};

export { PostList }

export default PostList;

