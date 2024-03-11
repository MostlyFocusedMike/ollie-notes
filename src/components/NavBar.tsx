"use client"
import { useSession } from "next-auth/react";
import Link from "next/link"
import { usePathname } from "next/navigation";

const linkClassName = `block
text-gray-900
rounded
md:border-0
md:hover:yellow-blue-700
md:p-0 dark:text-white
md:dark:hover:text-yellow-500
`

export default function NavBar() {
  const pathName = usePathname();
  // if you wanted to style active path, you just check if pathName === '/profile' and add a class
  const { data: session } = useSession();

  const createClassNameWithActiveLink = (path: string) => linkClassName + (pathName === path ? ' underline' : '')

  const isSignedIn = !!session?.user;

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b dark:bg-gray-900 border-gray-200 dark:border-gray-800">
      <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Ollie Notes</span>
      </a>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <ul className="flex space-x-2">
          <li className={createClassNameWithActiveLink('/articles')} >
            <Link href="/articles">Articles</Link>
          </li>
          {
            isSignedIn
              ? <>
                <li className={createClassNameWithActiveLink('/notes')} >
                  <Link href="/notes">Notes</Link>
                </li>

                <li className={createClassNameWithActiveLink('/profile')} >
                  <Link href="/profile">Profile</Link>
                </li>
              </>
              : <li className={createClassNameWithActiveLink('/sign-in')} >
                <Link href="sign-in">Sign In</Link>
              </li>
          }
        </ul>

      </nav>
    </header>
  )
}