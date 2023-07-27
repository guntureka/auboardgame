"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { hash } from "bcrypt";
import { User } from "@prisma/client";

const AddUser = () => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = async () => {
    try {
      if (form.getValues("username") === "" || form.getValues("password") === "") {
        toast({
          variant: "destructive",
          className: "bg-red-500",
          title: "Error",
          description: `Please fill all the fields`,
        });
      } else {
        const res = await fetch(`/api/user/username/${form.getValues("username")}`, {
          method: "GET",
          cache: "no-store",
        }).then((res) => res.json());
        if (res) {
          toast({
            variant: "destructive",
            className: "bg-red-500",
            title: "Error",
            description: `Username already exists`,
          });
          return;
        }
        await fetch(`/api/user`, {
          method: "POST",
          body: JSON.stringify(form.getValues()),
        });
        form.reset();
        toast({
          variant: "default",
          className: "bg-green-500",
          title: "User Added",
          description: `${form.getValues("username")} has been added to database`,
        });
        router.refresh();
      }
    } catch (error) {}
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>add User</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="gap-3">
            <DialogTitle className="text-center">Add User</DialogTitle>
            <DialogDescription className="text-center">Add new user to database</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} type={"text"} placeholder={"Jhon Smith"} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} type={"text"} placeholder={"jhonsmith"} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>password</FormLabel>
                    <FormControl>
                      <Input {...field} type={"password"} placeholder={"password"} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div>
                <Button className="w-full my-3 bg-green-500 hover:bg-green-500/90" type="submit">
                  Add
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddUser;
