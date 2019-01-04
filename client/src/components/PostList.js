import React from "react";
import { PropTypes } from "prop-types";

import { connect } from "react-redux";
import { getPosts } from "../actions/postsActions/postsActions";

import PostItem from "./PostItem";

class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ""
        };
    }

    componentDidMount() {
        this.props.getPosts();
    }



    render() {
        const { posts } = this.props;
        return (
            <div>

                <div className="grid">
                    {posts && posts.map(f => {
                        return <PostItem key={f._id} post={f} />;
                    })}
                </div>

            </div>
        );
    }
}

PostList.propTypes = {
    getPosts: PropTypes.func,
    posts: PropTypes.array
};

const mapStateToProps = ({ posts }) => {
    return {
        posts: posts.posts
    };
};

export { PostList }

export default
    connect(
        mapStateToProps,
        { getPosts }
    )(PostList)

