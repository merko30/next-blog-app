const Container = ({ children, classes }) => (
  <div className={`py-2 px-5 md:px-20 ${classes ? classes : ""}`}>
    {children}
  </div>
);

export default Container;
