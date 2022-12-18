const Message = ({ message, color, classes = "" }) => {
  return (
    <div
      className={`border rounded border-${color}-600 p-2 my-2 ${classes}`}
      onClick={() => console.log("clear")}
    >
      <p className={`text-${color}-700 uppercase`}>{message}</p>
    </div>
  );
};

export default Message;
