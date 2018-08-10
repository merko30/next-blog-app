import React, { Component } from "react";

import Header from "./components/core/Header";
import Footer from "./components/core/Footer";
import Routes from "./components/routing/Routes";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Routes />
        <Footer />
      </div>
    );
  }
}

export default App;
