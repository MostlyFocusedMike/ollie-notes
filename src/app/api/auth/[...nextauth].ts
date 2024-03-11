import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import User from '@/models/User';
import type { AuthOptions } from "next-auth"

// http://localhost:3000/api/auth/providers
// This is a page that shows all available providers

// We need to modify the session to include the user id (though this will only be available on the frontend)
declare module "next-auth" {
  interface Session {
    user: {
      id?: number;
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    };
  }

  interface Profile {
    email?: string | undefined;
    name?: string | undefined;
    avatar_url?: string | undefined;
    bio?: string | undefined;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({ user: { email, name }, account, profile }) {
      if (!email || !name) return false;
      const newUser = await User.createIfNotExists({
        email,
        name,
        profilePic: profile?.avatar_url || "",
        bio: profile?.bio || "",
        provider: account?.provider || "",
      });
      return !!newUser;
    },
    async session({ session }) {
      if (!session.user.email) {
        // I have no idea if the email can be missing, but returning the session
        // anyway because I don't know what will happen if I don't.
        console.warn('WARNING: No email found in session:', session)
        return session;
      }

      const dbUser = await User.findByEmail(session.user.email);
      if (dbUser && session.user) session.user.id = dbUser.id;

      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
