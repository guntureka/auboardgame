"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Category, User } from "@prisma/client";

const EditCategory = ({ category }: { category: Category }) => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      category: category.category,
    },
  });

  const onSubmit = async () => {
    try {
      if (form.getValues("category") === "") {
        toast({
          variant: "default",
          className: "bg-red-500",
          title: "Error",
          description: `Please fill all the fields`,
        });
      } else {
        const res = await fetch(`/api/category/${category.id}`, {
          method: "PATCH",
          body: JSON.stringify(form.getValues()),
        }).then((res) => res.json());

        if (!res) {
          toast({
            variant: "default",
            className: "bg-red-500",
            title: "Error",
            description: `Error updating category`,
          });
          return;
        }
        toast({
          variant: "default",
          className: "bg-green-500",
          title: "Category edited",
          description: `${form.getValues("category")} has been edited to database`,
        });
        router.refresh();
      }
    } catch (error) {}
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full" variant={"ghost"}>
            edit User
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="gap-3">
            <DialogTitle className="text-center">edit User</DialogTitle>
            <DialogDescription className="text-center">edit new user to database</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input {...field} type={"text"} placeholder={"Jhon Smith"} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div>
                <Button className="w-full my-3 bg-green-500 hover:bg-green-500/90" type="submit">
                  edit
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditCategory;
