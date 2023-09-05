"use client";

import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { DialogClose } from "@radix-ui/react-dialog";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AddPlayer = () => {
  const router = useRouter();
  const { data } = useSWR(`/api/quiz`, fetcher);

  const form = useForm({
    defaultValues: {
      player: "",
      quiz: "",
    },
  });

  const onSubmit = async () => {
    try {
      if (form.getValues().player === "" || form.getValues().quiz === "") {
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
          variant: "success",
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
        <Button variant={"success"} className="w-full">
          Add Player
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="gap-3">
          <DialogTitle className="text-center">Add Player</DialogTitle>
          <DialogDescription className="text-center">Add player</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 px-2">
            <FormField
              control={form.control}
              name="quiz"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quiz</FormLabel>
                  <Select onValueChange={field.onChange}>
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

            <DialogClose>
              <Button type="submit" variant={"success"} className="w-full">
                <span>Add Player</span>
              </Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPlayer;
