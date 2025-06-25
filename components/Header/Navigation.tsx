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
            <li className="w-24 h-8 bg-gray-200" />
          </>
        )}
        {!isLoading ? (
          !session ? (
            <li>
              <Link
                href="/login"
                className="px-4 py-2 bg-primary-main rounded-full text-white text-sm uppercase tracking-wider"
              >
                Get Started
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  href="/profile"
                  className="text-sm font-medium uppercase tracking-widest"
                >
                  Your Profile
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
