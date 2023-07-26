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
        <div className={`grid grid-cols-2`}>
          <Sheet>
            <SheetTrigger className="">
              <FiBookOpen size={32} />
            </SheetTrigger>
            {admin ? (
              <SheetContent side={"left"} className="flex flex-col justify-start items-start w-[250px]">
                <SheetHeader>
                  <SheetTitle>DASHBOARD</SheetTitle>
                </SheetHeader>
                {MenuProfile.dashboard.map((item, index) => (
                  <SheetDescription className="flex flex-col w-full">
                    <SheetClose key={index} asChild>
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
                  if (item.title === "USER" || item.title === "CATEGORY") {
                    return null;
                  }
                  return (
                    <SheetDescription className="flex flex-col w-full">
                      <SheetClose key={index} asChild>
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
          <div className="max-md:hidden mt-1">
            <Link href={"/"}>
              <Image src={`/images/logo.png`} alt={`logo`} width={50} height={50} />
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <Link href={"/"}>
            <Image src={`/images/logo.png`} alt={`logo`} width={50} height={50} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavbarLeft;
