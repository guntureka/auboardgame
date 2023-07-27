import { Session } from "next-auth";
import React, { Suspense } from "react";
import Loading from "./loading";
import DashNav from "@/components/dashboard/dashNav";

const LoginLayout = ({ children }: { children: React.ReactNode }, session: Session) => {
  return (
    <section>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </section>
  );
};

export default LoginLayout;
