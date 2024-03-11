"use client";
import { signIn } from "next-auth/react";

type ProviderType = {
  id: string;
  name: string;
}

const providerClass = ''

export default function SignInProvider({ providers }: { providers: ProviderType[] }) {
  const handleSignIn = (provider: ProviderType) => () => signIn(provider.id, { callbackUrl: '/profile' })

  return (
    <ul>
      {
        Object.values(providers).map((provider) => (
          <li key={provider.name}>
            <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={handleSignIn(provider)} >
              Sign in with {provider.name}
            </button>
          </li>
        ))
      }
    </ul>
  );
}