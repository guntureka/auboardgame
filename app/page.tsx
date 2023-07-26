import { getAllUser } from "@/lib/actions";
import { User } from "@prisma/client";
import Image from "next/image";

export default async function Home() {
  const user = await getAllUser();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Hello</h1>
        <pre>{user.map((user) => user.username)}</pre>
      </div>
    </main>
  );
}
