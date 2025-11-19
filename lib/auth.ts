import type { NextAuthOptions, User } from "next-auth";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import bcrypt from "bcrypt";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const email = credentials.email.toLowerCase().trim();
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("Invalid credentials");

        if (!user.emailVerified) {
          throw new Error("Email not verified. Check your inbox or request a new link.");
        }

        const isValid = await bcrypt.compare(credentials.password, user.passwordhashed);
        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        return { id: String(user.id), email: user.email, name: user.name, image: user.image } as User;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT & { id?: string }; user?: { id?: string | number } }) {
      if (user && typeof user.id !== "undefined") {
        token.id = String(user.id);
      }
      return token;
    },
    async session({ session, token }: { session: Session & { user?: Session["user"] & { id?: string } }; token: JWT & { id?: string } }): Promise<Session> {
      if (token && typeof token.id !== "undefined") {
        if (!session.user) session.user = {} as Session["user"] & { id?: string };
        session.user.id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error"
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default authOptions;
