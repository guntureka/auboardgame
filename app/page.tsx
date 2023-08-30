"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FiBook } from "react-icons/fi";
import { AiFillQuestionCircle } from "react-icons/ai";
import { FaFortAwesome } from "react-icons/fa";

export default function Home() {
  return (
    <div>
      <div className="grid md:grid-cols-2 grid-cols-1">
        <div className="bg-blue-500 flex flex-col gap-5 items-start justify-center p-16">
          <h1 className="font-bold text-4xl text-destructive ">WELCOME TO OUR OFFICIAL WEBSITE</h1>
          <p className={"text-justify text-black"}>Welcom to our official website, where you can find all the information about our board game.</p>
        </div>
        <div className="bg-red-500 flex flex-col gap-5 items-center justify-center p-20">
          <Image src={"/images/papan.png"} width={400} height={400} alt="papan" />
        </div>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center py-10">
        <h1 className="font-bold text-4xl text-center">
          WHT IS <span className="text-red-500">AU BOARD GAME</span>?
        </h1>
        <p className="text-justify">
          Discover the captivating world of AU Board Game, where strategy meets excitement. Immerse yourself in an engaging and interactive gaming experience that challenges your intellect and decision-making skills. Explore a myriad of
          intriguing scenarios, each offering unique challenges and rewards. Whether you&apos;re a seasoned board game enthusiast or new to the genre, AU Board Game guarantees hours of fun and unforgettable moments with friends and family.
          Unleash your competitive spirit and embark on an adventure that will keep you hooked from the very first roll of the dice.
        </p>
        <div className="flex items-center">
          <Button variant={"destructive"} className={"rounded-full"}>
            Learn more
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center p-12">
        <h1 className="font-bold text-4xl text-center">
          Do you want to <span className="text-red-500">know more</span> about the <span className="text-red-500">AU Board Game</span>?
        </h1>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
          <div className="flex flex-col gap-3 items-center px-5">
            <div>
              <FiBook size={150} />
            </div>
            <h1 className="font-bold text-2xl h-[60px]">PLAYING GUIDE</h1>
            <p className="text-center">Find out how to set up the game board, distribute components</p>
            <Button variant={"outline"} className="rounded-2xl border-primary">
              View more
            </Button>
          </div>
          <div className="flex flex-col gap-3 items-center px-5">
            <div>
              <AiFillQuestionCircle size={150} />
            </div>
            <h1 className="font-bold text-2xl h-[60px]">QUESTION</h1>
            <p className="text-center">Find out how to set up the game board, distribute components</p>
            <Button variant={"outline"} className="rounded-2xl border-primary">
              View more
            </Button>
          </div>
          <div className="flex flex-col gap-3 items-center px-5">
            <div>
              <FaFortAwesome size={150} />
            </div>
            <h1 className="font-bold text-2xl h-[60px]">CULTURE FACTS</h1>
            <p className="text-center">Find out how to set up the game board, distribute components</p>
            <Button variant={"outline"} className="rounded-2xl border-primary">
              View more
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center p-12">
        <h1 className="font-bold text-4xl text-center">
          <span className="text-red-500">Education</span> Made Exciting
        </h1>
        <p className="text-center">
          Say goodbye to monotonous learning routines and embrace the excitement of learning through play. Our board games ignite curiosity and fuel a passion for knowledge, making education an enthralling journey for everyone involved.
        </p>
      </div>
    </div>
  );
}
