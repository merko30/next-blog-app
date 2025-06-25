import Link from "next/link";

import Navigation from "./Navigation";

const Header = async () => (
  <header className="py-8">
    <div className="container flex items-center justify-between">
      <Link
        href="/"
        className="flex items-center uppercase font-md font-medium tracking-widest text-primary-darkest"
      >
        <span className="inline-block size-4 mr-1 bg-primary-main"></span>
        <span className="inline-block size-4 mr-1 bg-secondary-main"></span>{" "}
        Blog
      </Link>
      <Navigation />
    </div>
  </header>
);

export default Header;
