import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ollie Notes",
  description: "Take all your notes with Ollie Notes! Keep track of blogs, videos, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
