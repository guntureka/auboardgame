"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";


const SignupForm = () => {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      name: "",
    },
  });

  const router = useRouter();

  const handleSubmit = async () => {
    if (!form.getValues().username || !form.getValues().password || !form.getValues().name) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    } else {
      try {
        const user = await fetch(`/api/user/username/${form.getValues().username}`, {
          method: "GET",
          cache: "no-cache",
        }).then((res) => res.json());
        console.log(user);
        if (user) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "User already exists",
          });
          return;
        }
        const res = await fetch(`/api/user`, {
          method: "POST",
          body: JSON.stringify({
            username: form.getValues().username,
            password: form.getValues().password,
            name: form.getValues().name,
          }),
        });

        if (res.ok) {
          toast({
            variant: "default",
            title: "Success",
            description: "User created",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "User cannot be created",
          });
        }

        form.reset();
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="mt-5">
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Register to your account</CardDescription>
          <Separator />
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Your fullname..." />
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
                      <Input {...field} type="text" placeholder="Username..." />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="Password..." />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-4">
                Register
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="text-gray-400 text-sm">
            <span className=" text-primary text-md">Want to Login?</span>
            <Link href={"/signin"}> Go to login page</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupForm;
