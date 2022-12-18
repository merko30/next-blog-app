const Tab = ({ title, children, classes }) => {
  return (
    <div className={classes} data-testid="tab-content">
      {children}
    </div>
  );
};

Tab.displayName = "Tab";

export default Tab;
