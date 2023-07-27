import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import type { User } from "@prisma/client";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { Textarea } from "../ui/textarea";

const ProfileCard = ({ user }: { user: User }) => {
  const created = new Date(user.createdAt);
  const updated = new Date(user.updatedAt);
  return (
    <div className="p-3">
      <Card className="py-3 grid grid-cols-1 ">
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>Profile Description</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex flex-col justify-center items-center">
              {user.images && <Image src={user.images ? user.images : "/logo.png"} alt={user.name as any} width={100} height={100} />}
              <CgProfile size={150} className="rounded-full" />
            </div>
            <Table className="mt-[50px]">
              <TableBody className=" text-primary">
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>{user.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{user.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>{user.username}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Password</TableCell>
                  <TableCell>
                    <Textarea className="break-words" value={user.password} readOnly={true} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Role</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Created At</TableCell>
                  <TableCell>{created.toTimeString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Updated At</TableCell>
                  <TableCell>{updated.toTimeString()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCard;
