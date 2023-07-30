import React, { Suspense } from "react";
import Loading from "./loading";
import DashMenu from "@/components/dashboard/dashMenu";
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
