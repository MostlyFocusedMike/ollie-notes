"use client"
import { signIn, signOut, useSession } from "next-auth/react";


function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button onClick={() => signOut()}>Sign out {session?.user?.name}</button>
    )
  }

  return (
    <button onClick={() => signIn()}>Sign in</button>
  )
}

export default function NavBar() {
  return (
    <nav>
      <AuthButton />
    </nav>
  )
}