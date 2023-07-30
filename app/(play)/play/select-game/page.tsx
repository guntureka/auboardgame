import SelectQuiz from "@/components/play/selectQuiz";
import { User } from "@prisma/client";
import React from "react";

type Quiz = {
  id: string;
  quiz: string;
  allQuestion: boolean;
  user: User;
};

const getAllQuiz = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/quiz`, {
    method: "GET",
  }).then((res) => res.json());

  return res;
};

const SelectPage = async () => {
  const quiz = await getAllQuiz();
  return (
    <div className={`flex flex-col gap-5 my-10`}>
      <div className="flex items-center justify-center">
        <h1 className={`font-bold text-4xl`}>Quiz Select</h1>
      </div>
      <div className="">
        <SelectQuiz quiz={quiz} />
      </div>
    </div>
  );
};

export default SelectPage;
