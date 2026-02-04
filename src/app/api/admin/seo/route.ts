import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { getSeoConfig, setSeoConfig, type SeoConfig } from "@/lib/seo-config";

export async function GET() {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const config = await getSeoConfig();
    return NextResponse.json(config);
  } catch (e) {
    console.error("SEO config read error:", e);
    return NextResponse.json({ error: "Failed to load SEO config" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: Partial<SeoConfig>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  try {
    const config = await setSeoConfig({
      title: typeof body.title === "string" ? body.title : undefined,
      metaDescription:
        typeof body.metaDescription === "string" ? body.metaDescription : undefined,
      slug: typeof body.slug === "string" ? body.slug : undefined,
      jsonLdSchema: typeof body.jsonLdSchema === "string" ? body.jsonLdSchema : undefined,
    });
    return NextResponse.json(config);
  } catch (e) {
    console.error("SEO config write error:", e);
    return NextResponse.json({ error: "Failed to save SEO config" }, { status: 500 });
  }
}
