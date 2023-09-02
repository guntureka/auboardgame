"use client";

import { Separator } from "../ui/separator";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

const NavbarLeft = dynamic(() => import("./navbarLeft"), { ssr: false });
const NavbarMenu = dynamic(() => import("./navbarMiddle"), { ssr: false });
const NavbarProfile = dynamic(() => import("./navbarRight"), { ssr: false });

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <header className="container">
      <nav className="flex flex-row justify-between items-center gap-3 my-4">
        <div className="flex flex-row justify-between gap-3 items-center">
          <div className={session ? "md:hidden flex" : "hidden"}>
            <NavbarLeft session={session} />
          </div>
          <div className={session ? "hidden md:flex" : "flex"}>
            <Link href={"/"}>
              <Image src={`/images/logo.png`} alt={`logo`} width={50} height={50} />
            </Link>
          </div>
        </div>
        <NavbarMenu />
        <NavbarProfile session={session} />
      </nav>
      <Separator />
    </header>
  );
};

export default Navbar;
