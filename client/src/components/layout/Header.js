import React from "react";
import { Link } from "react-router-dom";

import { PropTypes } from "prop-types";

import { connect } from "react-redux";

import { Menu } from "semantic-ui-react";

import { logout } from "../../actions";

class Header extends React.Component {
  render() {
    return (
      <Menu stackable className="center aligned container">
        <Menu.Item header>
          <Link to="/">mediumLike</Link>
        </Menu.Item>
        <Menu.Menu position="right">
          {this.props.loggedIn && (
            <Menu.Item>
              <Link to="/post/new">Add new post</Link>
            </Menu.Item>
          )}
          {this.props.loggedIn ? (
            <Menu.Item>
              <button className="link" onClick={this.props.logout}>
                Logout
              </button>
            </Menu.Item>
          ) : (
              <Menu.Item>
                <Link to="/login" className="link">
                  Sign in
              </Link>
              </Menu.Item>
            )}
        </Menu.Menu>
      </Menu>
    );
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool,
  logout: PropTypes.func
};

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.isLoggedIn
  };
};

export default connect(
  mapStateToProps,
  { logout }
)(Header);
