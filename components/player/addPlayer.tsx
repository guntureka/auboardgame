"use client";

import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Category, Answer, Player } from "@prisma/client";
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
import { Session } from "next-auth";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { url } from "inspector";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AddPlayer = () => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(`/api/quiz`, fetcher);

  const form = useForm({
    defaultValues: {
      player: "",
      quiz: "",
    },
  });

  const onSubmit = async () => {
    try {
      if (form.getValues().player === "") {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Please fill all the fields",
        });
        return;
      }

      const res = await fetch(`/api/player`, {
        method: "POST",
        body: JSON.stringify({
          name: form.getValues().player,
          quizId: form.getValues().quiz,
        }),
      });
      if (res.ok) {
        form.reset();
        form.setValue("quiz", "");
        router.refresh();
        toast({
          title: "Success",
          variant: "default",
          description: "Player added successfully",
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
        <Button variant={"default"} className="w-full">Add Player</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Player</DialogTitle>
          <DialogDescription>Add new player</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="player"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Player</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Player name..." />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quiz"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quiz</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={`Select quiz`} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <ScrollArea className={` h-40`}>
                        {data?.map((quiz: any) => (
                          <SelectItem key={quiz.id} value={quiz.id}>
                            {quiz.quiz}
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              <span>Add Player</span>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPlayer;
