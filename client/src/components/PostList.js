import React from "react";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import {
    getPosts,
    setKeyword,
    getPostsByKeyword
} from "../actions/postsActions";

import PostItem from "./PostItem";

class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            postsPerPage: 8,
            currentPage: 1
        };
        this.filterPosts = this.filterPosts.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.setPage = this.setPage.bind(this);
    }

    componentDidMount() {
        this.props.getPosts();
    }

    setPage = e => {
        this.setState({
            currentPage: e.target.id
        });
    };

    onSearchChange = e => {
        this.setState({
            searchTerm: e.target.value
        });
    };

    filterPosts = () => {
        this.props.setKeyword(this.state.searchTerm);
    };

    render() {
        const { postsPerPage, currentPage } = this.state;
        const { posts, filtered } = this.props;

        const lastPost = currentPage * postsPerPage;
        const firstPost = lastPost - postsPerPage;
        const currentPosts = posts.slice(firstPost, lastPost);

        const pages = [];
        for (var i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
            pages.push(i);
        }
        return (
            <div>
                <input
                    type="text"
                    onChange={this.onSearchChange}
                    placeholder="Search posts"
                    id="searchInput"
                    onKeyUp={this.filterPosts}
                    value={this.state.searchTerm}
                />
                <div className="grid">
                    {currentPosts && (filtered == null || filtered.length == 0)
                        ? currentPosts.map(p => {
                              return <PostItem key={p._id} post={p} />;
                          })
                        : filtered.map(f => {
                              return <PostItem key={f._id} post={f} />;
                          })}
                </div>
                {((filtered && filtered.length) == 0 || filtered == null) && (
                    <ul className="pagination">
                        {pages.map(n => {
                            return (
                                <li
                                    className="pagination-item"
                                    id={n}
                                    key={n}
                                    onClick={this.setPage}
                                >
                                    {n}
                                </li>
                            );
                        })}
                    </ul>
                )}
                )}
            </div>
        );
    }
}

PostList.propTypes = {
    getPosts: PropTypes.func,
    setKeyword: PropTypes.func,
    posts: PropTypes.array,
    filtered: PropTypes.array
};

const mapStateToProps = state => {
    return {
        posts: state.posts.posts,
        filtered: getPostsByKeyword(state)
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        { getPosts, setKeyword }
    )(PostList)
);
