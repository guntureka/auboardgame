"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

const Providers = ({ children }: { children: React.ReactNode }, { session }: { session: Session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Providers;
