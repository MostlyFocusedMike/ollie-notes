import { getServerSession } from 'next-auth';

export default async function ProfilePage () {
  // naive implementation not using middleware yet
  const session = await getServerSession(); // this is how we can access the session on the server
  if (!session || !session.user) { return (
      <main>
        <h1>Log in!</h1>
      </main>
    );
  }

  return (
    <main>
      <h1>{session.user.name}</h1>
      <h2>Welcome!</h2>
    </main>
  );
}