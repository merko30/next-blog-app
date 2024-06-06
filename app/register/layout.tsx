const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full md:max-w-lg lg:max-w-xl m-auto py-8 px-6 rounded-md shadow">
    {children}
  </div>
);

export default Layout;
