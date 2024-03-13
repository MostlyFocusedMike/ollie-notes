import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import User from '@/models/User';
import TopicsSidebar from '@/components/TopicsSideBar';

// this is a protected route
export default async function NotesPage({ children }) {
  const session = await getServerSession();
  if (!session?.user?.email) return redirect('/');

  const user = await User.findByEmail(session.user.email);
  if (!user) return redirect('/');

  const topics = await user.getTopics();

  return (
    <>
      <p>Select some notes to get started</p>
    </>
  );
}