"use client";

import React, { use, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
import useSWR from "swr";
import { Checkbox } from "../ui/checkbox";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AddQuestion = ({ session }: { session: Session | null}) => {
  const router = useRouter();
  const [answers, setAnswers] = React.useState<string[]>(Array(5).fill(""));
  const [correct, setCorrect] = React.useState<string[]>(Array(5).fill(Boolean(false)));
  const difficulty = ["easy", "medium", "hard", "expert", "master"];
  const { data: categories, error, isLoading } = useSWR(`/api/category`, fetcher);

  const form = useForm({
    defaultValues: {
      difficulty: "easy",
      question: "",
      category: "",
      correct: correct,
      answer: answers,
    },
  });

  const onSubmit = async () => {
    console.log(form.getValues());
    try {
      if (form.getValues().question === "" || form.getValues().answer.filter((item) => item === "").length > 0 || form.getValues().correct.filter((item) => item === "").length > 0) {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Please fill all the fields",
        });
        return;
      }

      const res = await fetch(`/api/question`, {
        method: "POST",
        body: JSON.stringify({
          difficulty: form.getValues().difficulty,
          question: form.getValues().question,
          categoryId: form.getValues().category,
          userId: session?.user?.id,
        }),
      });

      if (res.ok) {
        res.json().then((data) => {
          {
            answers.map(async (item, index) => {
              const res = await fetch("/api/answer", {
                method: "POST",
                body: JSON.stringify({
                  answer: form.getValues().answer[index],
                  questionId: data.id,
                  isCorrect: form.getValues().correct[index],
                }),
              });
            });
          }
        });
      }
      if (res.ok) {
        form.reset();
        router.refresh();
        toast({
          title: "Success",
          variant: "default",
          description: "Question added successfully",
        });
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Question</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Question</DialogTitle>
          <DialogDescription>Add new question</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"nasi Kuning"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {difficulty.map((item, index) => (
                          <SelectItem key={`difficulty-${index}`} value={item}>
                            <div className="flex" key={`div-${index}`}>
                              {Array.from({ length: index + 1 }).map((_, idx) => (
                                <AiTwotoneStar key={idx} />
                              ))}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* category field */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"Select category"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map(
                          (
                            item: {
                              id: string;
                              category: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined;
                            },
                            index: any
                          ) => (
                            <SelectItem key={`category-${index}`} value={item.id}>
                              {item.category}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* question field */}

              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <Textarea {...field} placeholder="Question..." />
                  </FormItem>
                )}
              />
              {/* answer field */}
              {answers.map((_, index) => (
                <div key={`${index}`} className={`flex items-center gap-3`}>
                  <div className=" w-full">
                    <FormField
                      key={`$answer-${index}`}
                      control={form.control}
                      name={`answer.${index}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Answer {index + 1}</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Answer..." />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name={`correct.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-3">
                          <FormLabel>Correct</FormLabel>
                          <FormControl className="mx-auto">
                            <Checkbox {...field} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}

              <Button type="submit" className="w-full">
                <span>Add Answer</span>
              </Button>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestion;
