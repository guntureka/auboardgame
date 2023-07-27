import { Session } from "next-auth";
import React, { Suspense } from "react";
import Loading from "./loading";

const LoginLayout = ({ children }: { children: React.ReactNode }, session: Session) => {
  return (
    <section>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </section>
  );
};

export default LoginLayout;
