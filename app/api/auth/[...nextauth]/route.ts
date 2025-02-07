import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {dbConnect} from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      authorize: async (credentials) => {
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
          name: user.username,
          role: user.role,
          isPasswordChanged: user.isPasswordChanged ?? false, // Pastikan default value ada
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
      session.user = {
        ...session.user,
        id: token.id as string,
        role: token.role as string,
        isPasswordChanged: token.isPasswordChanged as boolean,
      };
      return session;
    },
  },
    
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", // Custom halaman login
  },
});

export { handler as GET, handler as POST };
