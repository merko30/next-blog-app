import React from "react";

const Tab = ({ title, children, classes }) => {
  Tab.displayName = "Tab";

  return <div className={classes}>{children}</div>;
};

export default Tab;
