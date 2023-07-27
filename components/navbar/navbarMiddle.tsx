"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Menubar } from "@/lib/menu";

const NavbarMiddle = ({ session }: { session: any }) => {
  return (
    <div>
      <NavigationMenu className="max-md:hidden">
        <NavigationMenuList>
          {Menubar.map((item, index) => (
            <NavigationMenuItem key={index}>
              <Link href={`${item.link}`} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>{item.title}</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="md:hidden">
        <Link href={'/'}>
            <h1 className="font-bold text-xl">AU BOARD GAME</h1>
        </Link>
      </div>
    </div>
  );
};

export default NavbarMiddle;
