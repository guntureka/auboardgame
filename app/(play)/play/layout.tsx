import React, { Suspense } from "react";
import Loading from "./loading";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <Suspense fallback={<Loading />}>
        <div>{children}</div>
      </Suspense>
    </section>
  );
};

export default DashboardLayout;
