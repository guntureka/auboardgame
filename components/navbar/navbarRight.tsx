"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { AiOutlineMenu } from "react-icons/ai";
import { MenuProfile } from "@/lib/menu";
import Link from "next/link";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const NavbarRight = ({ session }: { session: any }) => {
  const router = useRouter();
  return (
    <Sheet>
      <SheetTrigger>
        <AiOutlineMenu size={32} />
      </SheetTrigger>
      {session ? (
        <SheetContent
          side={"right"}
          className="flex flex-col justify-start items-start w-[250px]"
        >
          <SheetHeader>
            <SheetTitle>Profile</SheetTitle>
          </SheetHeader>
          {MenuProfile.profile.map((item, index) => (
            <SheetDescription key={index} className="flex flex-col w-full">
              <SheetClose asChild>
                <Link
                  href={item.link}
                  className="py-2 hover:bg-primary hover:text-white rounded hover:px-2 "
                >
                  {item.title}
                </Link>
              </SheetClose>
            </SheetDescription>
          ))}
          <div className="md:hidden w-full flex flex-col gap-3">
            <SheetHeader>
              <SheetTitle className="text-start">Menu</SheetTitle>
            </SheetHeader>
            {MenuProfile.menu.map((item, index) => (
              <SheetDescription key={index} className="flex flex-col w-full">
                <SheetClose asChild>
                  <Link
                    href={item.link}
                    className="py-2 hover:bg-primary hover:text-white rounded hover:px-2 "
                  >
                    {item.title}
                  </Link>
                </SheetClose>
              </SheetDescription>
            ))}
          </div>
          <SheetClose asChild>
            <Button
              className="w-full"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign out
            </Button>
          </SheetClose>
        </SheetContent>
      ) : (
        <SheetContent
          side={"right"}
          className="flex flex-col justify-start items-start w-[250px]"
        >
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          {MenuProfile.menu.map((item, index) => (
            <SheetDescription key={index} className="flex flex-col w-full">
              <SheetClose asChild>
                <Link
                  href={item.link}
                  className="py-2 hover:bg-primary hover:text-white rounded hover:px-2 "
                >
                  {item.title}
                </Link>
              </SheetClose>
            </SheetDescription>
          ))}
          <SheetClose asChild>
            <Button className="w-full" onClick={() => router.push("/signin")}>
              Sign in
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button className="w-full" onClick={() => router.push("/signup")}>
              Sign up
            </Button>
          </SheetClose>
        </SheetContent>
      )}
    </Sheet>
  );
};

export default NavbarRight;
