import { getServerSession } from "next-auth";
import { User } from "@prisma/client";

import authOptions from "@/lib/authOptions";

import Settings from "@/components/users/Settings";
import { getEnv } from "@/lib/env";

async function getData(): Promise<{ user: User }> {
  const session = await getServerSession(authOptions);

  const response = await fetch(
    `${getEnv("NEXT_PUBLIC_API_URL")}/users/${session?.user!.id}`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  const json = await response.json();

  return json;
}

const SettingsPage = async () => {
  const data = await getData();
  const { user } = data || {};

  return (
    <div>
      <h1 className="text-2xl font-semibold">Settings</h1>
      <p className="text-gray-700 text-sm mb-6">
        Update your profile information
      </p>
      {user && <Settings user={user} />}
    </div>
  );
};

export default SettingsPage;
