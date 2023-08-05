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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import QrCodeScanner from "../qrcode/qrCodeScanner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PointCard = () => {
  const router = useRouter();
  const cookies = getCookies();
  const [points, setPoints] = useState(0);
  const [qrcamera, setQrcamera] = useState(false);
  const [scores, setScore] = useState(0);
  const [properties, setProperties] = useState(0);
  const [name, setName] = useState("");
  useEffect(() => {
    if (!cookies) {
      router.push("/play");
    } else {
      const point = Number(getCookie("point"));
      const property = Number(getCookie("properties"));
      const savedScore = Number(getCookie("score"));
      const name = String(getCookie("name"));
      if (!isNaN(savedScore) || !isNaN(point) || !isNaN(property)) {
        setPoints(point);
        setScore(savedScore);
        setProperties(property);
        setName(name);
      }
    }
  }, [cookies, router]);

  const form = useForm({
    defaultValues: {
      point: 0,
    },
  });

  const handlePay = () => {
    const score = scores - Number(form.getValues("point"));
    if (score < 0) {
      toast({
        title: "Point tidak cukup",
        variant: "destructive",
        description: "Point anda tidak cukup untuk membeli rumah",
      });
      return;
    }
    setCookie("properties", properties + Number(form.getValues("point")));
    setProperties(properties + score);
    setCookie("score", score);
    setScore(score);
  };

  const handleNext = () => {
    setQrcamera(true);
  };

  const handlePrev = () => {
    setQrcamera(false);
  };

  const handleJual = () => {
    if (form.getValues().point > properties) {
      toast({
        title: "Point tidak cukup",
        variant: "destructive",
        description: "Point anda tidak cukup untuk membeli rumah",
      });
      return;
    }
    setCookie("score", scores + Number(form.getValues().point));
    setScore(scores + Number(form.getValues("point")));
    setProperties(properties - Number(form.getValues().point));
    setCookie("properties", properties - Number(form.getValues().point));
  };

  const handleStop = async () => {
    await fetch(`/api/player`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        score: points,
        quizId: cookies.quizId,
      }),
    });

    deleteCookie("score", { path: "/" });
    deleteCookie("point", { path: "/" });
    deleteCookie("properties", { path: "/" });
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
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Point</TableHead>
                  <TableHead>Properties</TableHead>
                  <TableHead>Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{points}</TableCell>
                  <TableCell>{properties}</TableCell>
                  <TableCell>{scores}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
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
                <div className={`flex gap-5`}>
                  <Button
                    type={"button"}
                    className="w-full"
                    onClick={() => handleJual()}
                  >
                    Jual
                  </Button>

                  <Button type="submit" className="w-full">
                    Belanja
                  </Button>
                </div>
              </form>
            </Form>
            <div className="flex gap-5">
              <Button
                className="w-full"
                variant={"destructive"}
                onClick={handleStop}
              >
                Berhenti
              </Button>
              <Button
                className="w-full"
                variant={"default"}
                onClick={handleNext}
              >
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
