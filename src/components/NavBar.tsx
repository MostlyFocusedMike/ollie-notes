"use client"
import { useSession } from "next-auth/react";
import Link from "next/link"
import { usePathname } from "next/navigation";

const linkClassName = `block
text-gray-900
rounded
md:border-0
md:hover:text-blue-700
md:p-0 dark:text-white
md:dark:hover:text-blue-500
`

export default function NavBar() {
  const pathName = usePathname();
  // if you wanted to style active path, you just check if pathName === '/profile' and add a class
  const { data: session } = useSession();

  const isSignedIn = !!session?.user;
  console.log('session here:', session);
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b dark:bg-gray-900 border-gray-200 dark:border-gray-800">
      <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Ollie Notes</span>
      </a>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <ul className="flex space-x-2">
          <li className={linkClassName + (pathName === '/articles' ? ' dark:text-blue-500' : '')} >
            <Link href="/articles">Articles</Link>
          </li>
          {
            isSignedIn
              ? <>
                <li className={linkClassName + (pathName === '/notes' ? ' dark:text-blue-500' : '')} >
                  <Link href="/notes">Notes</Link>
                </li>
                <li className={linkClassName + (pathName === '/profile' ? ' dark:text-blue-500' : '')} >
                  <Link href="/profile">Profile</Link>
                </li>
              </>
              : <li
                className={linkClassName}
              >
                <Link href="/api/auth/signin">Sign In</Link>
              </li>
          }
        </ul>
      </nav>
    </header>
  )
}