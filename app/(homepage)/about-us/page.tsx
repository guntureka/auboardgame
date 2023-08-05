import React from "react";
import Image from "next/image";

const Page = () => {
  return (
    <div className={"flex flex-col gap-10 p-5"}>
      <div className={"flex flex-col gap-10 text-center"}>
        <h1 className={"text-4xl font-bold"}>
          Selamat Datang di Website Resmi AU Board Game
        </h1>
        <p className={"text-center"}>
          Kami adalah tim penuh semangat yang berdedikasi untuk menghadirkan
          pengalaman bermain yang edukatif dan mendebarkan bagi semua orang. D
          sini, kami mempercayai bahwa belajar harus menjadi petualangan yang
          menyenangkan, dan dengan cinta kami terhadap permainan dan pendidikan,
          kami menciptakan board game yang menggabungkan keduanya.
        </p>
      </div>
      <div
        className={
          "flex flex-row gap-5 justify-center items-center border-2 border-blue-400 shadow rounded-xl p-5 bg-blue-400"
        }
      >
        <Image
          src={"/images/misi.png"}
          width={250}
          height={250}
          alt={"visi"}
          className={"mx-auto max-md:w-[150px]"}
        />
        <div>
          <h1 className={"text-3xl font-bold"}>Misi Kami</h1>
          <p>
            Meningkatkan minat literasi pengetahuan umum dan buadaya lokal
            dengan permainan yang menyenangkan
          </p>
        </div>
      </div>
      <div
        className={
          "flex flex-row gap-5 justify-center items-center border-2 border-red-400 p-5 shadow rounded-xl bg-red-400"
        }
      >
        <div>
          <h1 className={"text-3xl font-bold"}>Visi Kami</h1>
          <p>
            Dapat mendorong generasi masa depan untuk selalu ingin tahu dan
            terus belajar
          </p>
        </div>
        <Image
          src={"/images/visi.png"}
          width={250}
          height={250}
          alt={"visi"}
          className={"mx-auto max-md:w-[150px]"}
        />
      </div>
      <div className={"flex flex-col gap-10 text-center"}>
        <h1 className={"font-bold text-4xl"}>
          <span className={"text-red-500"}>Kualitas</span> dan{" "}
          <span className={"text-red-500"}>Nilai</span>
        </h1>
        <p>
          Kualitas adalah pijakan kuat dalam setiap langkah pembuatan board game
          kami. Kami menyajikan pengalaman bermain yang terbaik dengan material
          berkualitas tinggi,desain yang menarik, dan mekanika permainan yang
          disempurnakan. Kami juga menghargai nilai-nilai seperti integritas,
          transparansi, dan keberlanjutan, dan kami berkomitmen untuk
          menjalankan bisnis kami secara etis.
        </p>
      </div>
    </div>
  );
};

export default Page;
