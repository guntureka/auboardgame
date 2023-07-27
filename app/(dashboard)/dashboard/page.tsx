import DashboardCard from "@/components/dashboard/dashCard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { User } from "@prisma/client";
import { apiBaseUrl } from "next-auth/client/_utils";
import React from "react";

export interface Data {
  name: string;
  description: string;
  data: number;
}

const getAllusers = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
    method: "GET",
  });
  const data = await res.json();
  return data.length;
};

const DashboardPage = async () => {
  const users = await getAllusers();
  console.log(users);

  const Data = [
    {
      name: "User",
      description: "Banyaknya user yang terdaftar",
      data: users,
    },
    {
      name: "Question",
      description: "Banyaknya pertanyaan yang terdaftar",
      data: 0,
    },
    {
      name: "Answer",
      description: "Banyaknya jawaban yang terdaftar",
      data: 0,
    },
    {
      name: "Player",
      description: "Banyaknya player yang terdaftar",
      data: 0,
    },
    {
      name: "Game",
      description: "Banyaknya game yang terdaftar",
      data: 0,
    },
  ];

  return (
    <div>
      <div className="my-5">
        <h1 className="font-bold text-2xl text-center pb-5">DASHBOARD</h1>
        <DashboardCard data={Data} />
      </div>
    </div>
  );
};

export default DashboardPage;
