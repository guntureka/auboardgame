import React from "react";
import { cookies } from "next/headers";
import { Question } from "@prisma/client";
import PlayQuiz from "@/components/play/playQuiz";
import { redirect } from "next/navigation";

const getAllQuestion = async ({ slug }: { slug: string }) => {
  return await fetch(
    `${process.env.NEXTAUTH_URL}/api/question/difficulty/${slug}`,
    {
      method: "GET",
      cache: "no-cache",
    },
  ).then((res) => res.json());
};

const getQuiz = async ({ slug }: { slug: string | undefined }) => {
  return await fetch(`${process.env.NEXTAUTH_URL}/api/quiz/${slug}`, {
    method: "GET",
  }).then((res) => res.json());
};

const page = async ({ params }: { params: { slug: string } }) => {
  const questions = await getAllQuestion({ slug: params.slug });
  const cookieQuiz = cookies().get("quizId");
  const cookieName = cookies().get("name");
  if (cookieQuiz === undefined || cookieName === undefined) {
    return redirect("/play");
  }
  const quiz = await getQuiz({ slug: cookieQuiz?.value });
  let questionFiltered = questions;
  if (quiz.allQuestion === false) {
    questionFiltered = questions.filter((item: Question) => {
      return item.userId === quiz.userId;
    });
  }

  const question = await questionFiltered[
    Math.floor(Math.random() * questionFiltered.length)
  ];
  if (question === undefined || question === null) {
    return {
      notFound: true,
    };
  }

  return (
    <div>
      <PlayQuiz questions={question} />
    </div>
  );
};

export default page;
