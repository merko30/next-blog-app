import React from "react";
import { RouterProvider } from "react-router-dom";

import checkAuth from "./utils/checkAuth";

import router from "./routing/router";

checkAuth();

const App = () => <RouterProvider router={router} />;

export default App;
