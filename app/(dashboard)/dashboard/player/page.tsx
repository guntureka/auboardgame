import AddPlayer from "@/components/player/addPlayer";
import { Player, columns } from "@/components/player/columns";
import { PlayerDataTable } from "@/components/player/dataTable";
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect, useRouter } from "next/navigation";
import React from "react";

const getAllPlayer = async ({ id }: { id: string | null | undefined }): Promise<Player[]> => {
  if (id === null) {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/player`, {
      method: "GET",
    }).then((res) => res.json());
    return res;
  } else {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/player/quiz/${id}`, {
      method: "GET",
    }).then((res) => res.json());
    return res;
  }
};

const PlayerPage = async () => {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  let id = null;
  if (role !== "admin") {
    return redirect(`/dashboard`);
  }
  const data = await getAllPlayer({ id });
  return (
    <div>
      <div className="text-center py-3 my-5">
        <h1 className=" text-4xl font-bold">Player</h1>
      </div>
      <div className="flex flex-row items-start justify-start w-[150px]">
        <AddPlayer />
      </div>
      <div>
        <PlayerDataTable data={data} columns={columns} />
      </div>
    </div>
  );
};

export default PlayerPage;
