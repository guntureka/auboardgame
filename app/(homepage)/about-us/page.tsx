import React from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { team } from "@/lib/menu";

const Page = () => {
  return (
    <div className={"flex flex-col gap-10 p-5"}>
      <div className={"flex flex-col gap-10 text-center justify-center"}>
        <h1 className={"text-4xl font-bold"}>WHO WE ARE?</h1>
        <div className={"flex flex-col gap-5 items-center justify-center"}>
          <Card className={`w-full md:max-w-[350px] h-[400px] text-center flex flex-col justify-center`}>
            <CardHeader>
              <CardTitle>{team.mentor.title}</CardTitle>
            </CardHeader>
            <CardContent className={"flex items-center justify-center"}>
              <img src={team.mentor.img} alt={team.mentor.name} className={"h-[200px] w-[150px]"} />
            </CardContent>
            <CardFooter className={"flex justify-center"}>
              <h1 className={"text-center"}>{team.mentor.name}</h1>
            </CardFooter>
          </Card>
          <Card className={`w-full md:max-w-[350px] h-[400px] text-center flex flex-col justify-center`}>
            <CardHeader>
              <CardTitle>{team.chairman.title}</CardTitle>
            </CardHeader>
            <CardContent className={"flex items-center justify-center"}>
              <img src={team.chairman.img} alt={team.chairman.name} className={"h-[200px] w-[150px]"} />
            </CardContent>
            <CardFooter className={"flex justify-center"}>
              <h1 className={"text-center"}>{team.chairman.name}</h1>
            </CardFooter>
          </Card>
          <div className={"grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-center items-center gap-5 w-full text-center"}>
            {team.team.map((item, index) => (
              <Card className={`w-full h-[400px] text-center flex flex-col justify-center`} key={index}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className={"flex items-center justify-center"}>
                  <img src={item.img} alt={item.name} className={"h-[200px] max-w-[150px]"} />
                </CardContent>
                <CardFooter className={"flex justify-center"}>
                  <h1 className={"text-center"}>{item.name}</h1>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <div className={"flex flex-row max-md:flex-col gap-5 justify-center items-center border-2 border-blue-400 shadow rounded-xl p-10 bg-blue-400"}>
        <Image src={"/images/misi.png"} width={250} height={250} alt={"visi"} className={"mx-auto max-md:w-[150px]"} />
        <div>
          <h1 className={"text-3xl font-bold"}>Misi Kami</h1>
          <p>Meningkatkan minat literasi pengetahuan umum dan buadaya lokal dengan permainan yang menyenangkan</p>
        </div>
      </div>
      <div className={"max-md:hidden flex flex-row gap-5 justify-center items-center border-2 border-red-400 p-10 shadow rounded-xl bg-red-400"}>
        <div>
          <h1 className={"text-3xl font-bold"}>Visi Kami</h1>
          <p>Dapat mendorong generasi masa depan untuk selalu ingin tahu dan terus belajar</p>
        </div>
        <Image src={"/images/visi.png"} width={250} height={250} alt={"visi"} className={"mx-auto max-md:w-[150px]"} />
      </div>
      <div className={"md:hidden flex flex-col gap-5 justify-center items-center border-2 border-red-400 p-10 shadow rounded-xl bg-red-400"}>
        <Image src={"/images/visi.png"} width={250} height={250} alt={"visi"} className={"mx-auto max-md:w-[150px]"} />
        <div>
          <h1 className={"text-3xl font-bold"}>Visi Kami</h1>
          <p>Dapat mendorong generasi masa depan untuk selalu ingin tahu dan terus belajar</p>
        </div>
      </div>
      <div className={"flex flex-col gap-10 text-center"}>
        <h1 className={"font-bold text-4xl"}>
          <span className={"text-red-500"}>Kualitas</span> dan <span className={"text-red-500"}>Nilai</span>
        </h1>
        <p>
          Kualitas adalah pijakan kuat dalam setiap langkah pembuatan board game kami. Kami menyajikan pengalaman bermain yang terbaik dengan material berkualitas tinggi,desain yang menarik, dan mekanika permainan yang disempurnakan. Kami
          juga menghargai nilai-nilai seperti integritas, transparansi, dan keberlanjutan, dan kami berkomitmen untuk menjalankan bisnis kami secara etis.
        </p>
      </div>
    </div>
  );
};

export default Page;
