// lib/auth.ts
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { prisma } from './db';
import type { DefaultSession } from 'next-auth';

// Extend the session type to include user ID
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user']
  }
}

export const { 
  handlers: { GET, POST },
  auth, 
  signIn, 
  signOut 
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: String(credentials.email),
            },
          });

          if (!user) {
            console.log(`No user found for email: ${credentials.email}`);
            return null;
          }

          const isPasswordValid = await compare(
              String(credentials.password),
              user.password
          );

          if (!isPasswordValid) {
            console.log(`Invalid password for user: ${credentials.email}`);
            return null;
          }

          // Return only necessary user data without sensitive information
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/login',
    error: '/login', // Redirect to login on error
  },
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        // Optionally ensure email and name are also passed to the session
        session.user.email = token.email as string;
        session.user.name = token.name as string | null;
      }
      return session;
    },
  },

  debug: process.env.NODE_ENV === 'development',
});