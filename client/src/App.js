import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';

import Header from './components/layout/Header';
import Routes from './components/routing/Routes';
import Footer from './components/layout/Footer';

import { store } from './store';
import { getCurrentUser, logout } from './actions';

class App extends Component {

  componentDidMount() {
    if (localStorage.getItem('token')) {
      let token = localStorage.getItem('token');
      let decoded = jwt_decode(token);

      store.dispatch(getCurrentUser(decoded._id))

      if (decoded.exp > Date.now()) {
        localStorage.removeItem('token');

        store.dispatch(logout);
      }
    }
  }

  render() {
    return (
      <div className="container" style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
      }}>
        <Header />
        <Routes />
        <Footer />
      </div>
    );
  }
}

export default App;
