"use client";

import NavbarMenu from "./navbarMiddle";
import NavbarProfile from "./navbarRight";
import NavbarLeft from "./navbarLeft";
import { Separator } from "../ui/separator";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { AiOutlineMenu } from "react-icons/ai";
import { MenuProfile } from "@/lib/menu";
import { Button } from "../ui/button";
import { FiBookOpen } from "react-icons/fi";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <header className="container">
      <nav className="flex flex-row justify-between items-center gap-3 my-4">
        {/* logo */}
        <NavbarLeft session={session} />
        {/* Nav Menu */}
        <NavbarMenu session={session} />
        {/* Nav Profile */}
        <NavbarProfile session={session} />
      </nav>
      <Separator />
    </header>
  );
};

export default Navbar;
