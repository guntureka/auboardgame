import AddUser from "@/components/user/addUser";
import { columns } from "@/components/user/columns";
import { UserDataTable } from "@/components/user/dataTable";
import authOptions from "@/lib/auth";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import React from "react";

const getData = async (): Promise<User[]> => {
  return await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
    method: "GET",
  }).then((res) => res.json());
};

const UserPage = async () => {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (role !== "admin") {
    return (
      <div>
        <h1 className="text-center text-4xl font-bold">Not Found</h1>
      </div>
    );
  }
  const user = await getData();
  return (
    <div className="mt-5">
      <div className="text-center">
        <h1 className="text center font-bold text-4xl">User</h1>
      </div>
      <AddUser />
      <UserDataTable data={user} columns={columns} />
    </div>
  );
};

export default UserPage;
