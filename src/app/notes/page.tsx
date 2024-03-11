import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import User from '@/models/User';

// this is a protected route
export default async function NotesPage() {
  const session = await getServerSession();
  if (!session?.user?.email) return redirect('/');

  const user = await User.findByEmail(session.user.email);
  if (!user) return redirect('/');

  return (
    <>
      <h1 className='text-4xl font-bold mt-8 mb-4'>Notes</h1>
    </>
  );
}