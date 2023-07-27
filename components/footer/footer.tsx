"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { MenuProfile } from "@/lib/menu";
import { Separator } from "../ui/separator";
import { AiOutlineInstagram, AiOutlineTwitter, AiFillLinkedin } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <Separator />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-5">
          <div className="md:flex flex-col justify-center items-center my-auto hidden">
            <Link href={"/"}>
              <Image src={`/images/logo.png`} alt={`logo`} width={200} height={200} />
            </Link>
          </div>
          <div className="flex flex-col items-start gap-3">
            <h1 className="font-bold">MENU</h1>
            {MenuProfile.menu.map((item, index) => (
              <Link href={item.link} key={index}>
                {item.title}
              </Link>
            ))}
          </div>
          <div className="flex flex-col items-start gap-3">
            <h1 className="font-bold">SUPPORT & SERVICES</h1>
            {MenuProfile.support.map((item, index) => (
              <Link href={item.link} key={index}>
                {item.title}
              </Link>
            ))}
          </div>
          <div className="flex flex-col items-start gap-3">
            <h1 className="font-bold">SOCIAL MEDIA</h1>
            <div className="flex flex-row items-start gap-3">
              <Link href={"/"}>
                <AiOutlineInstagram size={32} />
              </Link>
              <Link href={"/"}>
                <FaTiktok size={32} />
              </Link>
              <Link href={"/"}>
                <AiOutlineTwitter size={32} />
              </Link>
              <Link href={"/"}>
                <AiFillLinkedin size={32} />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-5">
          <span>Copyright 2023 Au Board Game. All right reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
