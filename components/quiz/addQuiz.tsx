"use client";

import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Category, Answer, Quiz } from "@prisma/client";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AiTwotoneStar } from "react-icons/ai";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "../ui/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AddQuiz = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const form = useForm({
    defaultValues: {
      quiz: "",
      AllQuestion: "",
    },
  });

  const onSubmit = async () => {
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

      const res = await fetch(`/api/quiz`, {
        method: "POST",
        body: JSON.stringify({
          quiz: form.getValues().quiz,
          AllQuestion: Boolean(form.getValues().AllQuestion),
          userId: session?.user?.id,
        }),
      }).then((res) => res.json());
      if (res.ok) {
        form.reset();
        router.refresh();
        toast({
          title: "Success",
          variant: "default",
          description: "Quiz added successfully",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"default"}>Add Quiz</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Quiz</DialogTitle>
          <DialogDescription>Add new quiz</DialogDescription>
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
                      <SelectItem value={""}>By User Questions</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              <span>Add Game</span>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuiz;
