"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { accessToken, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !accessToken) {
      router.push("/need-login");
    }
  }, [accessToken, loading, router]);

  if (loading || !accessToken) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}