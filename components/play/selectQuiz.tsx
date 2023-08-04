"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { User } from "@prisma/client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { player } from "@/lib/menu";
import Image from "next/image";
import QrCodeScanner from "../qrcode/qrCodeScanner";
import { getCookies, setCookie } from "cookies-next";

type Quiz = {
  id: string;
  quiz: string;
  allQuestion: boolean;
  user: User;
};

const SelectQuiz = ({ quiz }: { quiz: Quiz[] }) => {
  const router = useRouter();
  const [qrcamera, setQrcamera] = useState(false);
  const [character, setCharacter] = useState("");
  const [isOnClick, setIsOnClick] = useState(-1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const filteredQuiz = quiz.filter(
    (quiz) =>
      quiz.quiz.toLowerCase().includes(search.toLowerCase()) ||
      quiz?.user?.username.toLowerCase().includes(search.toLowerCase()),
  );
  const form = useForm({
    defaultValues: {
      name: "",
      character: character,
    },
  });

  const allQuestion = (allQuestion: boolean) => {
    if (allQuestion) {
      return "Semua pertanyaan yang tersedia";
    } else {
      return "Pertanyaan dari author";
    }
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
    setQrcamera(false);
  };

  useEffect(() => {
    if (currentPage === 0) {
      router.push(`/play`);
    }
  }, [currentPage, router]);

  const handlePlay = (quizId: string, allQuestion: boolean) => {
    setCookie("quizId", quizId);
    setCookie("allQuestion", allQuestion);
    setCurrentPage(currentPage + 1);
  };

  const handleSubmit = () => {
    form.setValue("character", character);
    setCookie("name", form.getValues("name"));
    setCookie("character", form.getValues("character"));
    setCookie("score", 0);
    setCurrentPage(currentPage + 1);
    console.log(getCookies());
    setQrcamera(true);
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Button onClick={handlePrev}>Back</Button>
      </div>
      <div
        className={`flex flex-col gap-5 ${currentPage === 1 ? "" : "hidden"}`}
      >
        <div className="max-w-md">
          <Input
            type="text"
            id="search"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NO</TableHead>
                <TableHead>QUIZ</TableHead>
                <TableHead>JENIS</TableHead>
                <TableHead>CREATED BY</TableHead>
                <TableHead>ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuiz.map((quiz, index) => (
                <TableRow key={quiz.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{quiz.quiz}</TableCell>
                  <TableCell>{allQuestion(quiz.allQuestion)}</TableCell>
                  <TableCell>{quiz?.user?.username}</TableCell>
                  <TableCell>
                    <Button
                      type={`button`}
                      onClick={() => handlePlay(quiz.id, quiz.allQuestion)}
                    >
                      Play!
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div
        className={`flex flex-col gap-5 ${currentPage === 2 ? "" : "hidden"}`}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl className="max-w-md">
                    <Input {...field} type="text" placeholder="Namamu..." />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="character"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Character</FormLabel>
                  <div className={`grid grid-cols-2 gap-5`}>
                    {player.map((item, index) => (
                      <FormControl key={index}>
                        <div className="flex flex-col items-center justify-center gap-5">
                          <Button
                            {...field}
                            variant={isOnClick === index ? "default" : "ghost"}
                            type="button"
                            className="w-full h-full flex flex-col items-center justify-center"
                            onClick={() => [
                              setIsOnClick(index),
                              setCharacter(item.name),
                            ]}
                          >
                            {item.name}
                            <Image
                              {...field}
                              src={item.img}
                              alt="quiz"
                              width={80}
                              height={80}
                            />
                          </Button>
                        </div>
                      </FormControl>
                    ))}
                  </div>
                </FormItem>
              )}
            />
            <Button className=" w-[250px] flex mx-auto mt-5" type="submit">
              Done
            </Button>
          </form>
        </Form>
      </div>
      <div
        className={`flex flex-col gap-5 ${currentPage === 3 ? "" : "hidden"}`}
      >
        {qrcamera ? (
          <div>
            <QrCodeScanner />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-5">
            null
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectQuiz;
