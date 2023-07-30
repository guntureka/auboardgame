"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "../ui/use-toast";
import AddQuiz from "../quiz/addQuiz";
import { getCookies, hasCookie } from "cookies-next";

const ContentPlay = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const cookies = hasCookie("quizId");
  const [currentPage, setCurrentPage] = useState(1);

  const handleNext = () => {
    if (cookies) {
      return router.push(`/play/point`);
    }
    setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNewQuiz = () => {
    if (!session) {
      toast({
        title: "You must login first",
        description: "Please login first to create new quiz",
        variant: "destructive",
      });
      return;
    }
  };
  return (
    <div>
      <div className={`flex flex-col gap-5 justify-center items-center ${currentPage === 1 ? "" : "hidden"}`}>
        <Image src={`/images/logo.png`} alt={`logo`} width={500} height={500} />
        <h1>Welcome to AU BOARD GAME</h1>
        <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <Button variant={`destructive`} className={`rounded-2xl`} onClick={handleNext}>
          GET STARTED
        </Button>
      </div>
      <div className={`flex flex-col gap-5 my-5 w-[250px] mx-auto justify-center h-screen ${currentPage === 2 ? "" : "hidden"}`}>
        {session ? <AddQuiz session={session} /> : <Button onClick={handleNewQuiz}>Add quiz</Button>}
        <Button onClick={() => router.push("/play/select-game")}>Select Exciting Quiz</Button>
      </div>
    </div>
  );
};

export default ContentPlay;
