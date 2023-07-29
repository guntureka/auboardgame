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
import { Player } from "./columns";
import useSWR from "swr";
import { ScrollArea } from "../ui/scroll-area";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const EditPlayer = ({ player }: { player: Player }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data, error, isLoading } = useSWR(`/api/quiz`, fetcher);

  const form = useForm({
    defaultValues: {
      name: player.name,
      quiz: player.quizId,
    },
  });

  const onSubmit = async () => {
    try {
      if (form.getValues().name === "") {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Please fill all the fields",
        });
        return;
      }

      const res = await fetch(`/api/player/${player.id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: form.getValues().name,
        }),
      });
      if (res.ok) {
        router.refresh();
        toast({
          title: "Success",
          variant: "default",
          description: "Player edited successfully",
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
          Edit Player
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Player</DialogTitle>
          <DialogDescription>Edit new player</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="name"
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
              name="quiz"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quiz</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={field.value} />
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
              <span>Edit Game</span>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPlayer;
