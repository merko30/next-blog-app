import { User } from "@prisma/client";
import { getServerSession } from "next-auth";

import Image from "@/components/Image";

import authOptions from "@/lib/authOptions";
import Link from "next/link";
import ActiveLink from "@/components/ActiveLink";

async function getData(): Promise<{ user: User }> {
  const session = await getServerSession(authOptions);

  console.log(session?.user);

  const response = await fetch(
    `http://localhost:3000/api/users/${session?.user!.id}`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  const json = await response.json();

  return json;
}

const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {
  const data = await getData();
  const { user } = data || {};

  return (
    <div>
      <div className="flex items-center gap-6 mb-10 w-max">
        <Image
          src={user.image as string}
          alt="user's avatar"
          width={0}
          height={0}
          className="w-20 h-20 md:w-36 md:h-36 rounded-full flex-1"
        />
        <div>
          <h1 className="sm:text-xl">
            {user.firstName} {user.lastName}
          </h1>
          {user.shortDescription && (
            <h3 className="text-gray-500">{user.shortDescription}</h3>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 mb-6">
        {[
          { label: "Profile", href: "/profile" },
          { label: "Settings", href: "/profile/settings" },
        ].map((link) => (
          <ActiveLink key={link.href} href={link.href}>
            {link.label}
          </ActiveLink>
        ))}
      </div>
      <hr className="mb-10" />
      {children}
    </div>
  );
};
export default ProfileLayout;
