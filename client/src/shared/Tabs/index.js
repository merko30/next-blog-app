import React, { useState } from "react";
import TabsHeader from "./TabsHeader";

const Tabs = ({ children, classes }) => {
  const [active, setActive] = useState(children[0].props.title || null);

  return (
    <>
      {children && children.every(child => child.type.displayName === "Tab") && (
        <div className={classes}>
          <TabsHeader tabs={children} active={active} setActive={setActive} />
          {React.Children.map(children, child => {
            const isActive = child.props.title === active;
            return isActive && child;
          })}
        </div>
      )}
    </>
  );
};

export default Tabs;
