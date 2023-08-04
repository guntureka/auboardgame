import AddQuiz from "@/components/quiz/addQuiz";
import { columns } from "@/components/quiz/columns";
import { QuizDataTable } from "@/components/quiz/dataTable";
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const getAllGame = async ({ id }: { id: string | null | undefined }) => {
  if (id === null) {
    return await fetch(`${process.env.NEXTAUTH_URL}/api/quiz`, {
      method: "GET",
    }).then((res) => res.json());
  } else {
    return await fetch(`${process.env.NEXTAUTH_URL}/api/quiz/user/${id}`, {
      method: "GET",
    }).then((res) => res.json());
  }
};

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return <div>loading...</div>;

  let id = null;

  if (session.user.role !== "admin") {
    id = session?.user?.id;
  }

  const data = await getAllGame({ id });
  return (
    <div>
      <div className="text-center py-3 my-5">
        <h1 className=" text-4xl font-bold">Quiz</h1>
      </div>
      <div>
        <AddQuiz session={session} />
      </div>
      <div>
        <QuizDataTable data={data} columns={columns} />
      </div>
    </div>
  );
};

export default page;
