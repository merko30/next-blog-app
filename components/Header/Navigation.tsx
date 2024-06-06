"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navigation = () => {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  return (
    <nav>
      <ul className="flex items-center gap-4">
        {isLoading && (
          <>
            <li className="w-24 h-5 bg-gray-200" />
            <li className="w-20 h-5 bg-gray-200" />
          </>
        )}
        {!isLoading ? (
          !session ? (
            <>
              <li>
                <Link href="/login" className="text-sm font-md uppercase">
                  Sign in
                </Link>
              </li>

              <li>
                <Link href="/register" className="text-sm font-md uppercase">
                  Sign up
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/profile" className="text-sm font-md uppercase">
                  Profile
                </Link>
              </li>
              <li onClick={() => signOut()}>Logout</li>
            </>
          )
        ) : null}
      </ul>
    </nav>
  );
};

export default Navigation;
