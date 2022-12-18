import ReactDOM from "react-dom";
import Button from "./Button";

const Modal = ({ children, ...props }) => {
  return props.show ? (
    <div className="fixed top-0 left-0 right-0 bottom-0 overlay">
      {ReactDOM.createPortal(
        <div className="bg-white modal p-3" style={{ zIndex: 20 }}>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              props,
            });
          })}
          <Button color="red" onClick={() => props.onClose()}>
            Close
          </Button>
        </div>,
        document.body
      )}
    </div>
  ) : null;
};

export default Modal;
