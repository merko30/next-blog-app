import { getServerSession } from "next-auth";
import { User } from "@prisma/client";

import authOptions from "@/lib/authOptions";

import Settings from "@/components/users/Settings";

async function getData(): Promise<{ user: User }> {
  const session = await getServerSession(authOptions);

  const response = await fetch(
    `http://localhost:3000/api/users/${session?.user!.id}`,
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
      <h1 className="text-2xl font-semibold mb-8">Settings</h1>
      {user && <Settings user={user} />}
    </div>
  );
};

export default SettingsPage;
