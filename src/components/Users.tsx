import User from "@/models/User";

export default async function Users(): Promise<JSX.Element> {
  const users = await User.findMany();

  return (
    <div>
      <h2>User List</h2>
      {users.map((user) => (
        <div key={user.id}>
          {user.name.split(' ')[0]} - {user.bio}
        </div>
      ))}
    </div>
  );
}