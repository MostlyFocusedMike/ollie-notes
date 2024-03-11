import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation';
import SignInProvider from "@/components/SignInProviders";

export default async function SignIn() {
  const session = await getServerSession()

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) return redirect('/')

  const providers = await getProviders()

  return (
    <>
      <h1 className="text-4xl font-bold mt-8 mb-4">Sign In To Ollie Notes!</h1>
      <p>Select the provider below:</p>
      <SignInProvider providers={Object.values(providers || {})} />
    </>
  )
}