import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "@/lib/menu";

const Page = () => {
  return (
    <div className={"flex flex-col gap-10 p-10 text-center"}>
      <h1
        className={`font-bold text-xl border-2 border-red-500 rounded-full max-w-md mx-auto p-5`}
      >
        Frequently Ask Questions
      </h1>
      <div className={``}>
        <Accordion type={"single"} collapsible className={"w-full"}>
          {faq.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className={`text-start font-bold`}>
                {item.question}
              </AccordionTrigger>
              <AccordionContent className={`text-justify`}>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Page;
