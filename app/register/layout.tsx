import Layout from "@/layout/Form";

export default function LoginLayout(props:
    React.PropsWithChildren<{
        children: React.ReactNode;
    }>
)  {
  return (
    <Layout>
      {props.children}
    </Layout>
  );
}
