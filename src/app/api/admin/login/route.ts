import { NextRequest, NextResponse } from "next/server";
import { createSessionCookie, getCookieName, SESSION_MAX_AGE } from "@/lib/auth";

function getAdminCreds() {
  const user = (process.env.ADMIN_USERNAME ?? "").trim();
  let pass = (process.env.ADMIN_PASSWORD ?? "").trim();
  if (pass.startsWith('"') && pass.endsWith('"')) pass = pass.slice(1, -1).trim();
  return { user, pass };
}

export async function POST(request: NextRequest) {
  const { user, pass } = getAdminCreds();
  if (!user || !pass) {
    return NextResponse.json(
      { error: "Admin login is not configured. Set ADMIN_USERNAME and ADMIN_PASSWORD in .env.local." },
      { status: 503 }
    );
  }

  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const username = String(body.username ?? "").trim();
  const password = String(body.password ?? "").trim();

  if (username !== user || password !== pass) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }

  const value = createSessionCookie(username);
  const res = NextResponse.json({ success: true });
  res.cookies.set(getCookieName(), value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
  return res;
}
