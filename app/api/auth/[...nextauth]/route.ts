import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { dbConnect } from "@/lib/db"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Username dan password harus diisi.")
        }

        await dbConnect()
        const user = await User.findOne({ username: credentials.username })

        if (!user) {
          throw new Error("User tidak ditemukan.")
        }

        const isMatch = await bcrypt.compare(credentials.password, user.password)
        if (!isMatch) {
          throw new Error("Password salah.")
        }

        return {
          id: user._id.toString(),
          name: user.username,
          role: user.role,
          isPasswordChanged: user.isPasswordChanged,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.isPasswordChanged = user.isPasswordChanged
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.isPasswordChanged = token.isPasswordChanged
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
