"use client";

import React from "react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { BiBookOpen } from "react-icons/bi";
import { MenuProfile } from "@/lib/menu";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavbarLeft = ({ session }: { session: any }) => {
  const admin = session?.user.role === "admin";
  const router = useRouter();
  return (
    <Sheet>
      <SheetTrigger>
        <BiBookOpen size={32} />
      </SheetTrigger>
      {admin ? (
        <SheetContent side={"left"} className="flex flex-col justify-start items-start w-[250px]">
          <SheetHeader>
            <SheetTitle>DASHBOARD</SheetTitle>
          </SheetHeader>
          {MenuProfile.dashboard.map((item, index) => (
            <SheetDescription key={index} className="flex flex-col w-full">
              <SheetClose asChild>
                <Link href={item.link} className="py-2 hover:bg-primary hover:text-white rounded hover:px-2 ">
                  {item.title}
                </Link>
              </SheetClose>
            </SheetDescription>
          ))}
        </SheetContent>
      ) : (
        <SheetContent side={"left"} className="flex flex-col justify-start items-start w-[250px]">
          <SheetHeader>
            <SheetTitle>DASHBOARD</SheetTitle>
          </SheetHeader>
          {MenuProfile.dashboard.map((item, index) => {
            if (item.title === "USER" || item.title === "CATEGORY" || item.title === "PLAYER") {
              return null;
            }
            return (
              <SheetDescription key={index} className="flex flex-col w-full">
                <SheetClose asChild>
                  <Link href={item.link} className="py-2 hover:bg-primary hover:text-white rounded hover:px-2 ">
                    {item.title}
                  </Link>
                </SheetClose>
              </SheetDescription>
            );
          })}
        </SheetContent>
      )}
    </Sheet>
  );
};

export default NavbarLeft;
