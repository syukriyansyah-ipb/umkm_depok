"use client"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Loading from '@/app/components/front-end/LoadingSpinner'

export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session) {
      if (!session.user?.isPasswordChanged) {
        router.push("/change-password")
      } else if (["admin", "superadmin"].includes(session.user?.role as string)) {
        router.push("/admin")
      } else {
        // Redirect to a default page for authenticated users without admin privileges
        router.push("/dashboard")
      }
    }
  }, [session, router])

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault()
    setError("")

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    })
    setLoading(false)
    if (result?.error) {
      setLoading(false)
      setError("Login gagal. Periksa username dan password Anda.")
    } else {
      setLoading(false)
      // Instead of refreshing, we'll wait for the session to update
      // The useEffect above will handle the redirection
    }
  }

  if (status === "loading") {
    return <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6 ">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

