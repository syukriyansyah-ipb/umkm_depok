import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

let isInitialized = false

export async function middleware(request: NextRequest) {
  if (!isInitialized) {
    try {
      const response = await fetch(`${request.nextUrl.origin}/api/init-superadmin`)
      if (response.ok) {
        console.log("Superadmin initialized successfully")
        isInitialized = true
      } else {
        console.error("Failed to initialize superadmin")
      }
    } catch (error) {
      console.error("Error initializing superadmin:", error)
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: "/",
}

