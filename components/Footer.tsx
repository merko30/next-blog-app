import Link from "next/link";

const Footer = () => (
  <footer className="pb-8">
    <div className="container">
      <hr className="my-8" />
      <nav>
        <ul className="flex items-center gap-4">
          <li>
            <Link href="/login">About us</Link>
          </li>
          <li>
            <Link href="/register">Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
);

export default Footer;
