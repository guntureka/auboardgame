"use client";

import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { User } from "@prisma/client";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DialogClose } from "@radix-ui/react-dialog";

interface Quiz {
  id: string;
  allQuestion: boolean;
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
      allQuestion: String(quiz.allQuestion),
    },
  });

  const onSubmit = async () => {
    let quizes = false;
    if (form.getValues().allQuestion === "true") {
      quizes = true;
    }
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
          allQuestion: quizes,
        }),
      });
      if (res.ok) {
        router.refresh();
        toast({
          title: "Success",
          variant: "success",
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
        <Button className="w-full" variant={"success"}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="gap-3">
          <DialogTitle className="text-center">Edit Quiz</DialogTitle>
          <DialogDescription className="text-center">Edit new quiz</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="allQuestion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quiz Options</FormLabel>
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
            <FormField
              control={form.control}
              name="quiz"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quiz</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Quiz name..." />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogClose>
              <Button type="submit" variant={"success"} className="w-full">
                <span>Edit Quiz</span>
              </Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditQuiz;
