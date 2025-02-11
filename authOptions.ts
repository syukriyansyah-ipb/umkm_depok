// authOptions.ts
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Username dan password harus diisi.");
        }

        await dbConnect();
        const user = await User.findOne({ username: credentials.username });

        if (!user) {
          throw new Error("User tidak ditemukan.");
        }

        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) {
          throw new Error("Password salah.");
        }

        return {
          id: user._id.toString(),
          name: user.username.toString(),
          role: user.role.toString(),
          isPasswordChanged: user.isPasswordChanged.toBoolean(),
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role as string;
        token.isPasswordChanged = user.isPasswordChanged as boolean;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.isPasswordChanged = token.isPasswordChanged as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};