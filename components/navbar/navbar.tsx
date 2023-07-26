"use client";

import React from "react";
import NavbarMenu from "./navbarMiddle";
import NavbarProfile from "./navbarRight";
import NavbarLeft from "./navbarLeft";
import { Separator } from "../ui/separator";
const Navbar = () => {
  const session = true;
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
