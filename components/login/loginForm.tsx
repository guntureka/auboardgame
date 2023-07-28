"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Console } from "console";

const LoginForm = () => {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const router = useRouter();

  const handleSubmit = async () => {
    if (!form.getValues().username || !form.getValues().password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    } else {
      try {
        signIn("credentials", {
          username: form.getValues().username,
          password: form.getValues().password,
          redirect: false,
          callbackUrl: "/",
        }).then((res) => {
          if (res?.error) {
            toast({
              variant: "destructive",
              title: "Error",
              description: res.error,
            });
            console.log(res);
            return;
          }
          toast({
            variant: "default",
            title: "Success",
            description: "Logged in successfully",
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login to your account</CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
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
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <p className="text-gray-400 text-sm">
          <span className=" text-primary text-md">Forget password?</span> Please contact the Developer
        </p>
        <p className="text-gray-400 text-sm">
          <span className=" text-primary text-md">Sign up?</span>
          <Link href={"/signup"}> Sign up</Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
