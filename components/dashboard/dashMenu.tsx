"use client";

import React from "react";
import { MenuProfile } from "@/lib/menu";
import Link from "next/link";
import { useSession } from "next-auth/react";

const DashMenu = () => {
  const { data: session } = useSession();
  const admin = session?.user?.role === "admin";
  return (
    <div className="flex flex-col gap-5 py-5 px-2">
      <h1 className="font-bold">DASHBOARD</h1>
      {admin ? (
        <div className="hidden md:flex flex-col">
          {MenuProfile.dashboard.map((item, index) => (
            <Link key={index} href={item.link} className="py-2 hover:bg-primary hover:text-white rounded hover:px-2 ">
              {item.title}
            </Link>
          ))}
        </div>
      ) : (
        <div className="hidden md:flex flex-col">
          {MenuProfile.dashboard.map((item, index) => {
            if (item.title === "USER" || item.title === "CATEGORY") {
              return null;
            }
            return (
              <Link key={index} href={item.link} className="py-2 hover:bg-primary hover:text-white rounded hover:px-2 ">
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
