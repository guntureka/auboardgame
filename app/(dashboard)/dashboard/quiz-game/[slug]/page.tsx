import { columns, Player } from "@/components/player/columns";
import { PlayerDataTable } from "@/components/player/dataTable";
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const getAllPlayer = async ({ slug }: { slug: string }): Promise<Player[]> => {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/player/quiz/${slug}`,
    {
      method: "GET",
    },
  ).then((res) => res.json());

  return await fetch(`${process.env.NEXTAUTH_URL}/api/player/quiz/${slug}`, {
    method: "GET",
  }).then((res) => res.json());
};

const PlayerPage = async ({ params }: { params: { slug: string } }) => {
    await getServerSession(authOptions);
    const slug = params.slug;
    const data = await getAllPlayer({ slug });
  if (!data) return <div>loading...</div>;
  return (
    <div>
      <div className="text-center py-3 my-5">
        <h1 className=" text-4xl font-bold">Player</h1>
      </div>
      <div>
        <PlayerDataTable data={data} columns={columns} />
      </div>
    </div>
  );
};

export default PlayerPage;
