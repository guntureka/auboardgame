import { Session } from "next-auth";
import React, { Suspense } from "react";
import Loading from "./loading";
import DashMenu from "@/components/dashboard/dashMenu";

const LoginLayout = ({ children }: { children: React.ReactNode }, session: Session) => {
  return (
    <section>
      <Suspense fallback={<Loading />}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="col-span-2 max-md:hidden">
            <DashMenu />
          </div>
          <div className="col-span-full md:col-span-10">{children}</div>
        </div>
      </Suspense>
    </section>
  );
};

export default LoginLayout;
