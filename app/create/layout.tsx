import FormLayout from "@/layout/Form";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <FormLayout className="pb-[600px]" contentBoxClassName="max-w-3xl">
    {children}
  </FormLayout>
);

export default Layout;
