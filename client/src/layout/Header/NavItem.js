import { Link } from "react-router-dom";

const NavItem = ({ to, children }) => (
  <Link
    to={to}
    className="nav-item my-4 block border-b border-gray-200 first:border-0 md:border-0 md:my-0 md:mx-2 text-gray-900 hover:text-gray-800"
  >
    {children}
  </Link>
);

export default NavItem;
