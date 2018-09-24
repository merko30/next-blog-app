import React, { Component } from "react";

import Header from "./components/core/Header";
import Footer from "./components/core/Footer";
import Routes from "./components/routing/Routes";

class App extends Component {
    render() {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                    position: "relative"
                }}
            >
                <Header />
                <Routes />
                <Footer />
            </div>
        );
    }
}

export default App;
