"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Answer } from "@prisma/client";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AiTwotoneStar } from "react-icons/ai";
import { Progress } from "../ui/progress";
import { toast } from "../ui/use-toast";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { difficulty, score } from "@/lib/menu";

interface Question {
  id: number;
  question: string;
  answer: Answer[];
  difficulty: string;
  category: string;
}

export const colors = ["bg-red-300 hover:bg-red-300/90", "bg-green-300 hover:bg-green-300/90", "bg-blue-300 hover:bg-blue-300/90", "bg-yellow-300 hover:bg-yelow-300/90", "bg-purple-300 hover:bg-purple-300/90"];

const PlayQuiz = ({ questions }: { questions: Question }) => {
  const router = useRouter();
  const [isOnClicked, setIsOnClicked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [time, setTime] = useState(100);
  const [scores, setScores] = useState(0);
  const [point, setPoint] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTime((prev) => prev - 5);
    }, 1000);
    if (time === 0) {
      clearTimeout(timer);
      setIsSubmitted(true);
      toast({
        title: "Time is up",
        variant: "destructive",
        description: "Sorry you are out of time",
      });
      router.push(`/play/point`);
    }
    if (isSubmitted) {
      clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, [time, isSubmitted, router]);

  useEffect(() => {
    const savedScore = Number(getCookie("score"));
    const point = Number(getCookie("point"));
    if (!isNaN(savedScore) || !isNaN(point)) {
      setScores(savedScore);
      setPoint(point);
    }
  }, []);

  const scoreQuestion = (difficulty: string) => {
    score.map((item) => {
      if (item.difficulty === difficulty) {
        setScores(scores + item.score);
        setCookie("score", scores + item.score);
        setCookie("point", point + item.score);
      }
    });
  };
  const handleClick = (idx: number, correct: boolean) => {
    setIsOnClicked(!isOnClicked);
    setSelectedAnswerIndex(idx);
    if (correct) {
      setIsCorrect(true);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (isCorrect) {
      scoreQuestion(questions.difficulty);
      toast({
        title: "Correct",
        variant: "default",
        description: "You are correct",
      });
    }
  };

  let stars: any[] = [];

  for (let i = -1; i < difficulty.length; i++) {
    if (difficulty[i] === questions.difficulty) {
      break;
    }
    stars = [...stars, <AiTwotoneStar key={i} />];
  }

  const props = {
    disabled: isSubmitted,
  };

  const handleContinue = () => {
    router.push("/play/point");
  };

  return (
    <div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Question</CardTitle>
            <CardDescription>{questions.question}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {questions.answer.map((answer, index) => (
              <Button key={answer.id} className={`w-full text-primary ${colors[index]} ${selectedAnswerIndex === index ? "bg-primary hover:bg-primary text-white" : ""}`} onClick={() => handleClick(index, answer.isCorrect)} {...props}>
                {answer.answer}
              </Button>
            ))}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button onClick={handleSubmit} className="w-full" {...props}>
                  Submit
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className={`text-primary ${isCorrect ? "bg-green-500" : "bg-red-500"}`}>
                <AlertDialogHeader>
                  <AlertDialogTitle>Answer</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription className="text-primary">{`${isCorrect ? "you are correct" : "Sorry you are wrong"}`}</AlertDialogDescription>
                <AlertDialogFooter>
                  <AlertDialogAction onClick={handleContinue}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <CardFooter>
              <Progress value={time} className="bg-red-500" />
            </CardFooter>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlayQuiz;
