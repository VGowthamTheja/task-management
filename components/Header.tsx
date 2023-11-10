"use client";

import Link from "next/link";
import React, { useMemo } from "react";
import ClarityTasksSolidAlerted from "./icons/ClarityTasksSolidAlerted";
import { Avatar, Button } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
import {
  IcBaselineManageAccounts,
  SolarLogout2BoldDuotone,
} from "./icons/Icons";

const Header = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isAuthPage = useMemo(() => {
    return pathname === "/auth/signin" || pathname === "/auth/signup";
  }, [pathname]);
  return (
    <header className="border-b shadow p-6 mx-auto flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <ClarityTasksSolidAlerted className="w-8 h-8 text-blue-500" />
        <h1 className="text-2xl font-semibold">Tasks</h1>
      </Link>
      {!isAuthPage && !session && status === "unauthenticated" && (
        <div className="flex items-center space-x-4">
          <Button size="sm" className="text-sm" onClick={() => signIn()}>
            Login
          </Button>
          <Button size="sm" className="text-sm">
            Get Started
          </Button>
        </div>
      )}
      {!isAuthPage && session && status === "authenticated" && (
        <Dropdown>
          <DropdownTrigger className="cursor-pointer">
            <Avatar src={session.user?.image!} />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              startContent={
                <IcBaselineManageAccounts className="w-5 h-5 text-gray-500" />
              }
              key="profile"
            >
              Profile
            </DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="edit">Edit file</DropdownItem>
            <DropdownItem
              onClick={() => signOut()}
              startContent={<SolarLogout2BoldDuotone className="w-5 h-5" />}
              key="logout"
              className="text-danger"
              color="danger"
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </header>
  );
};

export default Header;
