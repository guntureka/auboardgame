import SignupForm from "@/components/signup/signupForm";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 py-5 items-center h-screen">
        <div
          className={` md:flex flex-col justify-center items-center mx-auto hidden `}
        ></div>
        <div className="md:col-span-1 col-span-full">
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default page;
