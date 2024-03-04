import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

// http://localhost:3000/api/auth/providers
// This is a page that shows all available providers

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };