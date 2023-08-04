import ActionCard from "@/components/profile/actionCard";
import ProfileCard from "@/components/profile/profileCard";
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const getUserbyId = async ({ id }: { id: string | undefined }) => {
  try {
    return await fetch(`${process.env.NEXTAUTH_URL}/api/user/${id}`, {
      method: "GET",
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
  }
};

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id;
  const user = await getUserbyId({ id });

  return (
    <div className="py-3">
      <div className="text-center">
        <h1>Profile</h1>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-5">
        <div>
          <ProfileCard user={user} />
        </div>
        <div>
          <ActionCard props={user} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
