import SignInOrOutButton from '@/components/SignInOrOutButton';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import User from '@/models/User';

// this is a protected route
export default async function ProfilePage() {
  const session = await getServerSession();
  if (!session?.user?.email) return redirect('/');

  const profileUser = await User.findByEmail(session.user.email);
  if (!profileUser) return redirect('/');
  const { email, name, profilePic, bio, provider } = profileUser;

  return (
    <>
      <h1>{name}</h1>
      <Image src={profilePic} alt={`${name}'s Avatar`} width={100} height={100} />
      <p>{bio}</p>
      <p>Email: {email}</p>
      <p>Signed In Via: {provider}</p>
      <SignInOrOutButton />
    </>
  );
}