import React, { Suspense } from "react";
import Loading from "./loading";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </section>
  );
};

export default LoginLayout;
