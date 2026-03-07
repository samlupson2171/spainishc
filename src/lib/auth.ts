import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Simple hardcoded auth for admin
        if (
          credentials?.email === 'admin@spanishconveyancing.es' &&
          credentials?.password === 'damian2026'
        ) {
          return {
            id: '1',
            email: 'admin@spanishconveyancing.es',
            name: 'Admin',
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/dashboard/login',
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
});
