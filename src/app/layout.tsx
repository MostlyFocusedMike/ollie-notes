import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Ollie Notes",
  description: "Take all your notes with Ollie Notes! Keep track of blogs, videos, and more.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(); // this is how we can access the session on the server
  // We then pass it into the SessionProvider as context
  // NOTE: because we are using children, this does NOT mean suddenly EVERY component is a client component
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <NavBar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
