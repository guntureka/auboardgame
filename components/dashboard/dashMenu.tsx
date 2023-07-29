"use client";

import React from "react";
import { MenuProfile } from "@/lib/menu";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const DashMenu = () => {
  const { data: session } = useSession();
  const admin = session?.user?.role === "admin";
  const path = usePathname();
  return (
    <div className="flex flex-col gap-5 py-5 px-2">
      <h1 className="font-bold">DASHBOARD</h1>
      {admin ? (
        <div className="hidden md:flex flex-col">
          {MenuProfile.dashboard.map((item, index) => (
            <Link key={index} href={item.link} className={` py-2 hover:bg-primary hover:text-white rounded hover:px-2 ${item.link === path ? "px-2 bg-primary text-primary-foreground" : ""}`}>
              {item.title}
            </Link>
          ))}
        </div>
      ) : (
        <div className="hidden md:flex flex-col">
          {MenuProfile.dashboard.map((item, index) => {
            if (item.title === "USER" || item.title === "CATEGORY" || item.title === "PLAYER") {
              return null;
            }
            return (
              <Link key={index} href={item.link} className={` py-2 hover:bg-primary hover:text-white rounded hover:px-2 ${item.link === path ? "px-2 bg-primary text-primary-foreground" : ""}`}>
                {item.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DashMenu;
