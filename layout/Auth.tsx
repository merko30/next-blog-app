import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full relative">
    <div className="w-full relative h-48 opacity-60">
      <Image
        src="/write.jpg"
        alt="writing-machine"
        fill
        className="object-fit object-top"
      />
    </div>

    <div className="w-full md:max-w-lg lg:max-w-xl py-8 px-6 rounded-md bg-white shadow z-10 absolute left-1/2 -translate-x-1/2 top-20">
      {children}
    </div>
  </div>
);

export default Layout;
