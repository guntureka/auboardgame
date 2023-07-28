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

const getAllCategory = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/category`, {
    method: "GET",
  });
  const data = await res.json();
  return data.length;
};

const getAllQuiz = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/quiz`, {
    method: "GET",
  });
  const data = await res.json();
  return data.length;
};

const getAllQuestion = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/question`, {
    method: "GET",
  });
  const data = await res.json();
  return data.length;
};

const getAllPlayer = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/player`, {
    method: "GET",
  });

  const data = await res.json();
  return data.length;
};

const DashboardPage = async () => {
  const [categories, quiz, questions, players] = await Promise.all([getAllCategory(), getAllQuiz(), getAllQuestion(), getAllPlayer()]);

  const Data = [
    {
      name: "Category",
      description: "Banyaknya kategori yang terdaftar",
      data: categories,
    },
    {
      name: "Question",
      description: "Banyaknya pertanyaan yang terdaftar",
      data: questions,
    },
    {
      name: "Quiz",
      description: "Banyaknya quiz yang terdaftar",
      data: quiz,
    },
    {
      name: "Player",
      description: "Banyaknya player yang terdaftar",
      data: players,
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
