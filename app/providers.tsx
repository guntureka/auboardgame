"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }, { session }: { session: Session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Providers;
