import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const GuestRoute = ({ component: Component, ...rest }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  return (
    <Route
      {...rest}
      render={(props) =>
        !loggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default GuestRoute;
