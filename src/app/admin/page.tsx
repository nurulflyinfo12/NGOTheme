"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminRootPage() {
  const router = useRouter();

  useEffect(() => {
    const admin = document.cookie.includes("admin=true");

    if (admin) {
      router.push("/admin/dashboard");
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      Redirecting...
    </div>
  );
}