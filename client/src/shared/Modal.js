import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const Modal = ({ children, ...props }) => {
  useEffect(() => {
    props.show
      ? (document.body.style.background = "rgba(0,0,0,0.3)")
      : (document.body.style.background = "transparent");
  }, [props.show]);
  return props.show
    ? ReactDOM.createPortal(
        <div className="bg-white modal p-3" style={{ zIndex: 20 }}>
          {React.Children.map(children, child => {
            return React.cloneElement(child, {
              props
            });
          })}
          <button onClick={() => props.onClose()}>close</button>
        </div>,
        document.body
      )
    : null;
};

export default Modal;
