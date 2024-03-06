import SignInOrOutButton from '@/components/SignInOrOutButton';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

// this is a protected route
export default async function ProfilePage () {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect('/');
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome {session.user.name}</p>
      <SignInOrOutButton />
    </div>
  );
}