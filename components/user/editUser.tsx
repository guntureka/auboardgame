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
import { DialogClose } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";

interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  role: string;
}

const EditUser = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isSamePassword, setIsSamePassword] = React.useState(false);

  const form = useForm({
    defaultValues: {
      name: user.name,
      username: user?.username,
      password: user.password,
      role: user.role,
      passwordConfirm: "",
    },
  });

  const onSubmit = async () => {
    try {
      if (form.getValues("username") === "" || form.getValues("password") === "") {
        toast({
          variant: "destructive",
          title: "Error",
          description: `Please fill all the fields`,
        });
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
        variant: "success",
        title: "User updated",
        description: `${form.getValues("username")} has been updated to database`,
      });
      router.refresh();
    } catch (error) {}
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
          <DialogTitle className="text-center">Edit User</DialogTitle>
          <DialogDescription className="text-center">User has been edited</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 px-2">
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
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <Label className={isSamePassword ? "hidden" : "text-destructive"}> password not same !</Label>
                  <FormControl>
                    <Input
                      {...field}
                      required={form.getValues("password") === field.value || field.value === "" ? setIsSamePassword(true)! : setIsSamePassword(false)!}
                      type={"password"}
                      placeholder={"password"}
                      className={isSamePassword ? "" : "border-destructive"}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogClose asChild>
              <Button className="w-full my-3 bg-green-500 hover:bg-green-500/90" type="submit">
                Edit
              </Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUser;
