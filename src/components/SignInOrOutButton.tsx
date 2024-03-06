"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function SignInOrOutButton() {
  const { data: session } = useSession();

  const handleSignOut = () => signOut();
  const handleSignIn = () => signIn();

  if (!session?.user) return <button onClick={handleSignIn}>Sign in</button>

  return (
    <button onClick={handleSignOut}>Sign out</button>
  )
}