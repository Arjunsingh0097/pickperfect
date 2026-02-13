import { NextResponse } from "next/server";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/compare-quotes";

export function middleware(request: Request) {
  const url = new URL(request.url);
  // Redirect root to landing page: / → /compare-quotes
  if (url.pathname === "/" || url.pathname === "") {
    return NextResponse.redirect(new URL(basePath, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
