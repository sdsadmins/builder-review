import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        try {
          const response = await fetch(`${API_URL}/api/v1/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(
              (error as { message?: string }).message ?? 'Invalid credentials'
            );
          }

          const data = await response.json() as {
            user: {
              id: string;
              email: string;
              name: string;
              roles: string[];
              permissions: string[];
            };
            accessToken: string;
            refreshToken?: string;
          };

          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            roles: data.user.roles,
            permissions: data.user.permissions,
            accessToken: data.accessToken,
          };
        } catch (error) {
          if (error instanceof Error) throw error;
          throw new Error('Authentication failed');
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.roles = (user as { roles?: string[] }).roles ?? [];
        token.permissions = (user as { permissions?: string[] }).permissions ?? [];
        token.accessToken = (user as { accessToken?: string }).accessToken ?? '';
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.roles = token.roles as string[];
        session.user.permissions = token.permissions as string[];
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// TypeScript augmentation for next-auth session
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      roles: string[];
      permissions: string[];
    };
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    roles: string[];
    permissions: string[];
    accessToken: string;
  }
}
