"use client"
import { useSession } from "next-auth/react";
import Link from "next/link"
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathName = usePathname();
  console.log('pathName:', pathName);
  // if you wanted to style active path, you just check if pathName === '/profile' and add a class
  const { data: session } = useSession();

  const isSignedIn = !!session?.user;
  console.log('session here:', session);
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/test">Test</Link>
        </li>
        {
          isSignedIn
            ? <li> <Link href="/profile">Profile</Link> </li>
            : <li> <Link href="/api/auth/signin">Sign In</Link> </li>
        }
      </ul>
    </nav>
  )
}