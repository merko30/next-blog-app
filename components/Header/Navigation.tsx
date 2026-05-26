"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { PlusIcon, UserIcon } from "@phosphor-icons/react/dist/ssr";
import Dropdown, {
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@/components/Dropdown";

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
                <PlusIcon />
                Write
              </ButtonLink>
              <li>
                <Dropdown>
                  <DropdownTrigger>
                    <div className="size-9 flex items-center justify-center bg-secondary-main rounded-full cursor-pointer">
                      <UserIcon color="white" size={20} />
                    </div>
                  </DropdownTrigger>
                  <DropdownMenu align="right">
                    <DropdownItem>
                      <Link href="/profile" className="block w-full">
                        Profile
                      </Link>
                    </DropdownItem>
                    <DropdownItem onSelect={() => signOut()}>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </li>
            </>
          )
        ) : null}
      </ul>
    </nav>
  );
};

export default Navigation;
