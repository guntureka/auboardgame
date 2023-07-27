"use client";

import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Category, Answer, User } from "@prisma/client";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Quiz {
  id: string;
  AllQuestion: boolean;
  quiz: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

const EditQuiz = ({ quiz }: { quiz: Quiz }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const form = useForm({
    defaultValues: {
      quiz: quiz.quiz,
      AllQuestion: String(quiz.AllQuestion),
    },
  });

  const onSubmit = async () => {
    let quizes = false;
    if (form.getValues().AllQuestion === "true") {
      quizes = true;
    }
    console.log(form.getValues().quiz, Boolean(form.getValues().AllQuestion));
    try {
      if (form.getValues().quiz === "") {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Please fill all the fields",
        });
        return;
      }

      const res = await fetch(`/api/quiz/${quiz.id}`, {
        method: "PUT",
        body: JSON.stringify({
          quiz: form.getValues().quiz,
          AllQuestion: quizes,
        }),
      });
      console.log(res);
      if (res.ok) {
        router.refresh();
        toast({
          title: "Success",
          variant: "default",
          description: "Quiz edited successfully",
        });
        return;
      }

      toast({
        title: "Error",
        variant: "destructive",
        description: "Something went wrong",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant={"default"}>
          Edit Quiz
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Quiz</DialogTitle>
          <DialogDescription>Edit new quiz</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="quiz"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Game</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Game name..." />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="AllQuestion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Game</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"true"}>All Questions</SelectItem>
                      <SelectItem value={"false"}>By User Questions</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              <span>Edit Game</span>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditQuiz;
