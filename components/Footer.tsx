const Footer = () => (
  <footer className="pb-8">
    <div className="container">
      <hr className="my-8" />
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Merim. All rights reserved.
        </p>
        <p className="text-sm text-gray-500">
          Built with ❤️ using Next.js and TypeScript.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
