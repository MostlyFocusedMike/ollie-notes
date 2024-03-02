import { prisma } from "@/db";

export default async function Users(): Promise<JSX.Element> {
  const users = await prisma.user.findMany();

  return (
    <div>
      <h2>User List</h2>
      {users.map((user) => (
        <div key={user.id}>
          {user.id} - {user.uid}
        </div>
      ))}
    </div>
  );
}