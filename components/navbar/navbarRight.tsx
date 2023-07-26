import React from "react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { AiOutlineMenu } from "react-icons/ai";
import { MenuProfile } from "@/lib/menu";
import Link from "next/link";
import { Button } from "../ui/button";

const NavbarRight = ({ session }: { session: any }) => {
  return (
    <div>
      {/* Mobile device */}
      <Sheet>
        <SheetTrigger>
          <AiOutlineMenu size={32} />
        </SheetTrigger>
        {session ? (
          <SheetContent side={"right"} className="flex flex-col justify-start items-start w-[250px]">
            <SheetHeader>
              <SheetTitle>Profile</SheetTitle>
            </SheetHeader>
            {MenuProfile.profile.map((item, index) => (
              <SheetDescription className="flex flex-col w-full">
                <SheetClose key={index} asChild>
                  <Link href={item.link} className="py-2 hover:bg-primary hover:text-white rounded hover:px-2 ">
                    {item.title}
                  </Link>
                </SheetClose>
              </SheetDescription>
            ))}
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            {MenuProfile.menu.map((item, index) => (
              <SheetDescription className="flex flex-col w-full">
                <SheetClose key={index} asChild>
                  <Link href={item.link} className="py-2 hover:bg-primary hover:text-white rounded hover:px-2 ">
                    {item.title}
                  </Link>
                </SheetClose>
              </SheetDescription>
            ))}
            <Button className="w-full">Sign out</Button>
          </SheetContent>
        ) : (
          <SheetContent side={"right"} className="flex flex-col justify-start items-start w-[250px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            {MenuProfile.menu.map((item, index) => (
              <SheetDescription className="flex flex-col w-full">
                <SheetClose key={index} asChild>
                  <Link href={item.link} className="py-2 hover:bg-primary hover:text-white rounded hover:px-2 ">
                    {item.title}
                  </Link>
                </SheetClose>
              </SheetDescription>
            ))}
            <Button className="w-full">Sign in</Button>
            <Button className="w-full">Sign out</Button>
          </SheetContent>
        )}
      </Sheet>
    </div>
  );
};

export default NavbarRight;
