import React from "react";
import Image from "next/image";

const Page = () => {
  return (
    <div className={"flex flex-col gap-10 p-5 md:p-14 text-center"}>
      <h1 className={"font-bold text-4xl"}>
        <span className={"text-red-500"}>Kontak </span>
        Kami
      </h1>
      <p>
        kami sangat menghargai umpan balik dari pengguna dan mitra kami. Jangan
        ragu untuk menghubungi kami melalui email, nomor telepon, maupun media
        sosial yang tercantum di bawah ini.
      </p>
      <div className={"flex flex-col justify-center items-start gap-5 mx-auto"}>
        <div className={"flex gap-3"}>
          <Image
            src={"/images/email.png"}
            alt={"email"}
            width={32}
            height={32}
          />
          <span>auboardgame.hybrid@gmail.com</span>
        </div>
        <div className={"flex gap-3"}>
          <Image src={"/images/hp.png"} alt={"email"} width={32} height={32} />
          <span>+62 89671563063</span>
        </div>
        <div className={"flex gap-3"}>
          <Image
            src={"/images/instagram.png"}
            alt={"email"}
            width={32}
            height={32}
          />
          <span>@auboardgame.hybrid</span>
        </div>
      </div>
      <p className={"font-bold text-lg"}>
        Terima kasih telah berkunjung ke
        <span className={"text-red-500"}> AU Board Game </span>. Kami berharap
        anda menemukan inspirasi dan kegembiraan dalam perjalanan belajar
        bersama kami. Bersama - sama, mari kita
        <span className={"text-red-500"}> mewujudkan masa depan </span> yang
        <span className={"text-red-500"}> cerdas, kreatif, </span> dan
        <span className={"text-red-500"}> penuh kesenangan </span> untuk semua!
      </p>
    </div>
  );
};

export default Page;
