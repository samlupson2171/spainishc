import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { findAdminByEmail, verifyPassword, seedInitialAdmin } from '@/lib/adminUsers';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Ensure at least one admin exists (seeds on first run)
          await seedInitialAdmin();

          const user = await findAdminByEmail(credentials.email as string);
          if (!user) {
            return null;
          }

          const isValid = await verifyPassword(credentials.password as string, user.passwordHash);
          if (!isValid) {
            return null;
          }

          return {
            id: user._id?.toString() || '1',
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/dashboard/login',
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
});
