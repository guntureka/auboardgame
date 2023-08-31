import SelectQuiz from "@/components/play/selectQuiz";
import React from "react";

const getAllQuiz = async () => {
  return await fetch(`${process.env.NEXTAUTH_URL}/api/quiz`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  }).then((res) => res.json());
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
