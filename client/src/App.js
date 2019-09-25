import React from "react";

import Routes from "./routing/Routes";
import checkAuth from "./utils/checkAuth";
checkAuth();

export default () => {
  return <Routes />;
};
