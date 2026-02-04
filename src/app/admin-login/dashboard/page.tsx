import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth";
import Link from "next/link";
import { AdminDashboardClient } from "./AdminDashboardClient";
import { SeoEditor } from "./SeoEditor";

export default async function AdminDashboardPage() {
  const session = await verifySession();
  if (!session) {
    redirect("/admin-login");
  }

  return (
    <div className="min-h-screen bg-[#e0ebf0]">
      <header className="bg-white border-b border-[#b0d4db]">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <h1 className="text-lg font-semibold text-[#0d3842]">Admin dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{session.username}</span>
            <AdminDashboardClient />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="rounded-xl bg-white p-6 shadow border border-[#b0d4db]">
          <h2 className="text-xl font-medium text-[#0d3842] mb-4">Welcome</h2>
          <p className="text-gray-600">
            You are logged in as <strong>{session.username}</strong>. Use this area to manage
            settings, content, or other admin tasks.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              href="/"
              className="rounded-lg bg-mint px-4 py-2 text-sm font-medium text-deep hover:bg-[#9fc5ce]"
            >
              View site
            </Link>
            <Link
              href="/admin-login"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Back to login
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <SeoEditor />
        </div>
      </main>
    </div>
  );
}
