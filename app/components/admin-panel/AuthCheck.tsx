"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthCheck({ role }: { role: string[] }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || !role.includes(session.user?.role)) {
      router.push("/login");
    }
  }, [session, status, router]);

  return null; // Tidak perlu render apa pun
}
