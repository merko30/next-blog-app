import React, { useState } from "react";
import Container from "../../layout/Container";

const Tabs = ({ children }) => {
  const [active, setActive] = useState(children[0].props.title || null);

  return (
    <>
      {children && (
        <div>
          <ul className="flex items-center bg-gray-100 h-12">
            {React.Children.map(
              children,
              child =>
                child.type.name === "Tab" && (
                  <li
                    style={{ letterSpacing: "0.3em" }}
                    className={`${
                      active === child.props.title ? "bg-teal-300 " : " "
                    } list-none uppercase ${
                      active === child.props.title
                        ? " text-teal-700 "
                        : " text-gray-500 "
                    } flex-1 text-center h-full flex justify-center items-center cursor-pointer`}
                    onClick={() => setActive(child.props.title)}
                  >
                    {child.props.title}
                  </li>
                )
            )}
          </ul>
          {React.Children.map(children, child => {
            return (
              child.props.title === active && child.type.name === "Tab" && child
            );
          })}
        </div>
      )}
    </>
  );
};

export default Tabs;
