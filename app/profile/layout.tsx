import { User } from "@prisma/client";
import { getServerSession } from "next-auth";

import authOptions from "@/lib/authOptions";
import { getEnv } from "@/lib/env";

import ActiveLink from "@/components/ActiveLink";
import Author from "@/components/Author";

async function getData(): Promise<{ user: User }> {
  const session = await getServerSession(authOptions);

  const response = await fetch(
    `${getEnv("NEXT_PUBLIC_API_URL")}/users/${session?.user!.id}`,
    {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  const json = await response.json();

  return json;
}

const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {
  const data = await getData();
  const { user } = data || {};

  return (
    <div className="container lg:max-w-3xl py-12">
      <div className="flex items-center gap-6 mb-10 w-max">
        <Author user={user} imageClassName="size-16" size={64} />
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
