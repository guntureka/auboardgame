import Providers from "@/app/providers";
import { columns } from "@/components/question/columns";
import { QuestionDataTable } from "@/components/question/dataTable";
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import React from "react";
import dynamic from "next/dynamic";
import AddQuestion from "@/components/question/addQuestion";

const getAllQuestion = async ({ id }: { id: string | null | undefined }) => {
  if (id === null) {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/question`, {
      method: "GET",
    }).then((res) => res.json());
    return res;
  } else {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/question/user/${id}`, {
      method: "GET",
    }).then((res) => res.json());
    return res;
  }
};

const QuestionPage = async () => {
  const session = await getServerSession(authOptions);
  let id = null;
  if (session?.user.role !== "admin") {
    id = session?.user?.id;
  }
  const data = await getAllQuestion({ id });
  return (
    <div>
      <div className="text-center py-3 my-5">
        <h1 className=" text-4xl font-bold">Question</h1>
      </div>
      <div>
        <AddQuestion session={session} />
      </div>
      <div>
        <QuestionDataTable data={data} columns={columns} />
      </div>
    </div>
  );
};

export default QuestionPage;
