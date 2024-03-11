"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function SignInOrOutButton() {
  const { data: session } = useSession();

  const handleSignOut = () => signOut();
  const handleSignIn = () => signIn();

  if (!session?.user) return <button onClick={handleSignIn}>Sign in</button>

  return (
    <button onClick={handleSignOut} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
      Sign out
    </button>
  )
}