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
import { Player } from "./columns";
import useSWR from "swr";
import { ScrollArea } from "../ui/scroll-area";
import { DialogClose } from "@radix-ui/react-dialog";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const EditPlayer = ({ player }: { player: Player }) => {
  const router = useRouter();
  const { data } = useSWR(`/api/quiz`, fetcher);

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
          variant: "success",
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
        <Button className="w-full" variant={"success"}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="gap-3">
          <DialogTitle className="text-center">Edit Player</DialogTitle>
          <DialogDescription className="text-center">Edit new player</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 px-2">
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

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Player</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Player name..." />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogClose>
              <Button type="submit" variant={"success"} className="w-full">
                <span>Edit Player</span>
              </Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPlayer;
