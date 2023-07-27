import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Image from "next/image";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("@/components/login/loginForm"), { ssr: false });

const LoginPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect("/");
  }
  return (
    <main className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 py-5 items-center h-screen">
        <div className={` md:flex flex-col justify-center items-center mx-auto hidden `}>
          <Image src={"/images/logo.png"} alt="logo" width={500} height={500} priority />
        </div> 
        <div className="md:col-span-1 col-span-full">
          <LoginForm />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
