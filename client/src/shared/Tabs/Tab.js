import React from "react";

const Tab = ({ title, children, classes }) => {
  return <div className={classes}>{children}</div>;
};

Tab.displayName = "Tab";

export default Tab;
