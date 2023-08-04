"use client";

import { deleteCookie, getCookie, getCookies, setCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import QrCodeScanner from "../qrcode/qrCodeScanner";

const PointCard = () => {
  const router = useRouter();
  const cookies = getCookies();
  const [points, setPoints] = useState(0);
  const [qrcamera, setQrcamera] = useState(false);

  useEffect(() => {
    if (!cookies) {
      router.push("/play");
    } else {
      const savedScore = Number(getCookie("score"));
      if (!isNaN(savedScore)) {
        setPoints(savedScore);
      }
    }
  }, [cookies, router]);

  const form = useForm({
    defaultValues: {
      point: 0,
    },
  });

  const handlePay = () => {
    const score = points - Number(form.getValues("point"));
    if (score < 0) {
      toast({
        title: "Point tidak cukup",
        variant: "destructive",
        description: "Point anda tidak cukup untuk membeli rumah",
      });
      return;
    }
    setCookie("score", score);
    setPoints(score);
  };

  const handleNext = () => {
    setQrcamera(true);
  };

  const handlePrev = () => {
    setQrcamera(false);
  };

  const handleStop = async () => {
    await fetch(`/api/player`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cookies.name,
        score: points,
        quizId: cookies.quizId,
      }),
    });

    deleteCookie("score", { path: "/" });
    deleteCookie("quizId", { path: "/" });
    deleteCookie("allQuestion", { path: "/" });
    deleteCookie("character", { path: "/" });
    deleteCookie("name", { path: "/" });
    toast({
      title: "Terimakasih",
      variant: "default",
      description: "Terimakasih telah bermain",
    });
    return router.push("/play");
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center my-10">
        <h1 className="font-bold text-4xl">POINT</h1>
      </div>
      <div className={`flex flex-col gap- 5 ${qrcamera ? "hidden" : ""}`}>
        <Card>
          <CardHeader>
            <CardTitle>Point Card</CardTitle>
            <CardDescription>{`${points} point`}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handlePay)}
                className="flex flex-col gap-5"
              >
                <FormField
                  control={form.control}
                  name="point"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Belanjakan Point</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Belanja
                </Button>
              </form>
            </Form>
            <div className="flex gap-5">
              <Button className="w-full" onClick={handleStop}>
                Berhenti
              </Button>
              <Button className="w-full" onClick={handleNext}>
                Lanjut
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <div className={`flex flex-col gap-5 ${qrcamera ? "" : "hidden"}`}>
          {qrcamera ? (
            <div className="">
              <Button onClick={handlePrev} className="my-5">
                Back
              </Button>
              <QrCodeScanner />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-5">
              null
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PointCard;
