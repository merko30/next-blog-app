import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="relative w-full min-h-screen bg-gray-50">
    {/* Background image container */}
    <div className="relative h-48 w-full opacity-60">
      <Image
        src="/write.jpg"
        alt="writing-machine"
        fill
        className="object-cover object-top"
        priority
      />
    </div>

    {/* Floating content box */}
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-xl px-6 py-8 rounded-md bg-white shadow">
      {children}
    </div>
  </div>
);

export default Layout;
