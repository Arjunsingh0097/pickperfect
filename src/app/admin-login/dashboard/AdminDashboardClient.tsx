"use client";

import { useRouter } from "next/navigation";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function AdminDashboardClient() {
  const router = useRouter();

  async function handleLogout() {
    await fetch(`${BASE}/api/admin/logout`, { method: "POST" });
    router.push("/admin-login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
    >
      Log out
    </button>
  );
}
