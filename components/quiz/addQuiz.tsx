"use client";

import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import useSWR from "swr";
import { Category } from "@prisma/client";
import { DialogClose } from "@radix-ui/react-dialog";
const AddQuiz = ({ session }: { session: Session | null }) => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      quiz: "",
      allQuestion: "",
      category: "",
    },
  });

  const onSubmit = async () => {
    console.log(form.getValues().quiz, Boolean(form.getValues().allQuestion));
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
          allQuestion: Boolean(form.getValues().allQuestion),
          userId: session?.user?.id,
        }),
      });
      if (res.ok) {
        form.reset();
        router.refresh();
        toast({
          title: "Success",
          variant: "success",
          description: "Quiz added successfully",
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
        <Button variant={"success"}>Add Quiz</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="gap-3">
          <DialogTitle className="text-center">Add Quiz</DialogTitle>
          <DialogDescription className="text-center">Add new quiz</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 px-2">
            <FormField
              control={form.control}
              name="allQuestion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question options</FormLabel>
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
                <span>Add Quiz</span>
              </Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuiz;
