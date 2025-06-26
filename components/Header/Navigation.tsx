"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Plus, User } from "@phosphor-icons/react/dist/ssr";

const ButtonLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => (
  <Link
    href={href}
    className="flex items-center gap-2 px-4 py-2 bg-primary-main rounded-full text-white text-sm uppercase tracking-wider"
  >
    {children}
  </Link>
);

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
            <ButtonLink href="/login">Get Started</ButtonLink>
          ) : (
            <>
              <ButtonLink href="/create">
                <Plus />
                Write
              </ButtonLink>
              <li className="size-9 flex items-center justify-center bg-secondary-main rounded-full">
                <Link href="/profile">
                  <User color="white" size={20} />
                </Link>
              </li>

              <li className="cursor-pointer" onClick={() => signOut()}>
                Logout
              </li>
            </>
          )
        ) : null}
      </ul>
    </nav>
  );
};

export default Navigation;
