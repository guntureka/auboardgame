import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
//import type { User } from "@prisma/client";

type User = {
  id: number;
  name: string;
  game: [];
  question: [];
};

const ActionCard = ({ props }: { props: User }) => {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
      <Card>
        <CardHeader>
          <CardTitle>Question</CardTitle>
          <CardDescription>Question that has been created by {props.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <span>{props.question.length}</span>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Game</CardTitle>
          <CardDescription>Game that has been created by {props.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <span>{props.game.length}</span>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActionCard;
