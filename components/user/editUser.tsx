"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  role: string;
}

const EditUser = ({ user }: { user: User }) => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: user.name,
      username: user?.username,
      password: user.password,
      role: user.role,
    },
  });

  const onSubmit = async () => {
    try {
      if (form.getValues("username") === "" || form.getValues("password") === "") {
        toast({
          variant: "default",
          className: "bg-red-500",
          title: "Error",
          description: `Please fill all the fields`,
        });
      } else {
        if (form.getValues("password") === user.password ) {
          const res = await fetch(`/api/user/${user.id}`, {
            method: "PATCH",
            body: JSON.stringify({
              name: form.getValues("name"),
              username: form.getValues("username"),
              role: form.getValues("role"),
            }),
          });
          if (!res.ok) {
            toast({
              variant: "destructive",
              title: "User Exists",
              description: `${form.getValues("username")} has been already exists in database`,
            });
            return;
          }
        } else {
          const res = await fetch(`/api/user/${user.id}`, {
            method: "PATCH",
            body: JSON.stringify(form.getValues()),
          });
          if (!res.ok) {
            toast({
              variant: "destructive",
              title: "User Exists",
              description: `${form.getValues("username")} has been already exists in database`,
            });
            return;
          }
        }
        toast({
          variant: "default",
          className: "bg-green-500",
          title: "User updated",
          description: `${form.getValues("username")} has been updated to database`,
        });
        router.refresh();
      }
    } catch (error) {}
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant={"ghost"}>
          Edit User
        </Button>
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
                    <Input {...field} type={"text"} placeholder={"password"} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <div>
              <Button className="w-full my-3 bg-green-500 hover:bg-green-500/90" type="submit">
                Edit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUser;
