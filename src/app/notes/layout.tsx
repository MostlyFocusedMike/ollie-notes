import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import User from '@/models/User';
import TopicsSidebar from '@/components/TopicsSideBar';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  if (!session?.user?.email) return redirect('/');

  const user = await User.findByEmail(session.user.email);
  if (!user) return redirect('/');

  const topics = await user.getTopics();
  return (
    <>
      <div className="flex gap-4">
        <TopicsSidebar topics={topics} />
        {children}
      </div >
    </>
  );
}
