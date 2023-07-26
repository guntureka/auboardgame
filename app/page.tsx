import { getAllUser } from "@/lib/actions";

export default async function Home() {
  const user = await getAllUser();
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello</h1>
      <pre>{user.map((user) => user.id)}</pre>
    </div>
  );
}
