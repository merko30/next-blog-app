import React from "react";
import ReactDOM from "react-dom";
import "./styles/tailwind.css";
import { Router } from "react-router-dom";
import "./styles/index.css";
import { Provider } from "react-redux";

import App from "./App";

import history from "./config/history";
import store from "./config/store";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
