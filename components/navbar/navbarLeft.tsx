"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { AiOutlineMenu } from "react-icons/ai";
import { MenuProfile } from "@/lib/menu";
import { Button } from "../ui/button";
import { FiBookOpen } from "react-icons/fi";

const NavbarLeft = ({ session }: { session: any }) => {
  const admin = false;
  return (
    <div>
      {session ? (
        <div className="flex items-center justify-between gap-3">
          <Sheet>
            <SheetTrigger>
              <FiBookOpen size={32} />
            </SheetTrigger>
            <SheetContent side={"left"} className="flex flex-col justify-start items-start w-[250px]">
              <SheetHeader>
                <SheetTitle>DASHBOARD</SheetTitle>
              </SheetHeader>
              <SheetDescription className="flex flex-col w-full">
                {admin ? (
                  <SheetClose asChild>
                    {MenuProfile.dashboard.map((item, index) => (
                      <Link href={item.link} key={index}>
                        {item.title}
                      </Link>
                    ))}
                  </SheetClose>
                ) : (
                  <SheetClose asChild>
                    {MenuProfile.dashboard.map((item, index) => {
                      if (item.title === "user" || item.title === "category") {
                        return null;
                      }
                      return (
                        <Link href={item.link} key={index}>
                          {item.title}
                        </Link>
                      );
                    })}
                  </SheetClose>
                )}
              </SheetDescription>
            </SheetContent>
          </Sheet>
          <div className="max-md:hidden">
            <Link href={"/"}>
              <Image src={`/images/logo.png`} alt={`logo`} width={50} height={50} />
            </Link>
          </div>
        </div>
      ) : (
        <Link href={"/"}>
          <Image src={`/images/logo.png`} alt={`logo`} width={50} height={50} />
        </Link>
      )}
    </div>
  );
};

export default NavbarLeft;
